import copy
import datetime
import json

import dateparser
import requests
# from environs import Env
from rocketry import Rocketry


def fetchGitlabCIResults(
    branch_name,
    gitlabID,
    gitlabName,
    since,
    before,
    personalAccessToken,
    per_page
):
    print(before)
    # Get all pipline runs between specified dates
    session = requests.Session()
    currentPage = 1
    since_formated = f"{since:%Y-%m-%dT%H:%M:%SZ}"
    before_formated = f"{before:%Y-%m-%dT%H:%M:%SZ}"
    print("Since: ", since_formated)
    print("Before: ", before_formated)
    url = (
        "https://git.speag.com/api/v4/projects/"
        + gitlabID
        + "/pipelines?ref="
        + branch_name
        + "&updated_after="
        + since_formated
        + "updated_before="
        + before_formated
        + "&page="
        + str(currentPage)
        + "&per_page="
        + str(per_page)
    )
    hed = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-By": "cli",
        "Authorization": "Bearer " + personalAccessToken,
    }
    r = session.get(url, headers=hed)
    assert r.status_code == 200
    jsonResponses = []
    while r.json() != []:
        url = (
            "https://git.speag.com/api/v4/projects/"
            + gitlabID
            + "/pipelines?ref="
            + branch_name
            + "&updated_after="
            + since_formated
            + "updated_before="
            + before_formated
            + "&page="
            + str(currentPage)
            + "&per_page="
            + str(per_page)
        )
        r = session.get(url, headers=hed)
        assert r.status_code == 200
        jsonResponses += copy.deepcopy(r.json())
        currentPage += 1
    #
    aggregatedPipelineResults = {}
    # For all pipeline runs, get all job results
    for pipelinerun in jsonResponses:
        print("Processing PipelineID ", str(pipelinerun["id"]))
        currentPageJobs = 1
        url = (
            "https://git.speag.com/api/v4/projects/"
            + gitlabID
            + "/pipelines/"
            + str(pipelinerun["id"])
            + "/jobs"
            + "?page="
            + str(currentPageJobs)
            + "&per_page="
            + str(per_page)
        )
        r = session.get(url, headers=hed)
        while r.json() != []:
            assert r.status_code == 200
            for job in r.json():
                jobName = job["name"].lower()
                # print("Stage:",job['stage'])
                if jobName not in aggregatedPipelineResults:
                    aggregatedPipelineResults[jobName] = []
                selectedjobInformation = {
                    "status": job["status"],
                    "web_url": job["web_url"],
                    "started_at": job["started_at"],
                }
                aggregatedPipelineResults[jobName].append(
                    copy.deepcopy(selectedjobInformation)
                )
            #
            currentPageJobs += 1
            url = (
                "https://git.speag.com/api/v4/projects/"
                + gitlabID
                + "/pipelines/"
                + str(pipelinerun["id"])
                + "/jobs"
                + "?page="
                + str(currentPageJobs)
                + "&per_page="
                + str(per_page)
            )
            r = session.get(url, headers=hed)
    """"
    # Do some aggregation for parallel tests, so they are displayed only as "parallel"
    # FIXME: Remove all assumptions about the e2e tests from this code, either perform custom renaming somewhere else or maybe even rename the tests.
    # Maybe some common naming convention is necessary?
    if (
        "parallel" not in aggregatedPipelineResults
        and len([x for x in aggregatedPipelineResults.keys() if "parallel_users" in x])
        > 0
    ):
        aggregatedPipelineResults["parallel"] = []
        dictKeysToPop = []
        for testName in aggregatedPipelineResults.keys():
            if "parallel_users" in testName:
                aggregatedPipelineResults["parallel"] += copy.deepcopy(
                    aggregatedPipelineResults[testName]
                )
                dictKeysToPop.append(testName)
        for key in dictKeysToPop:
            aggregatedPipelineResults.pop(key)
    """

    # Calculate number of failed runs etc.
    currentRunDict = {"branch": branch_name}
    # print(aggregatedPipelineResults)
    testsData = {
        "testId": gitlabName,
        "branch": branch_name,
        "link": "https://git.speag.com/oSparc/" + gitlabName + "/-/pipelines?page=1&scope=all&ref=" + branch_name,
        "tests": []
    }
    for testName in aggregatedPipelineResults.keys():
        aggregatedPipelineResults[testName] = copy.deepcopy(
            {
                "allTestResults": aggregatedPipelineResults[testName],
                "numTotalRuns": len(aggregatedPipelineResults[testName]),
                "numFailedRuns": len(
                    [
                        x
                        for x in aggregatedPipelineResults[testName]
                        if x["status"] == "failed"
                    ]
                ),
                "failedTestResults": [
                    x
                    for x in aggregatedPipelineResults[testName]
                    if x["status"] == "failed"
                ],
            }
        )
        testsData["tests"].insert(0, dict({
            "name": testName,
            "failed": aggregatedPipelineResults[testName]["numFailedRuns"],
            "runs": aggregatedPipelineResults[testName]["numTotalRuns"],
        }))
        currentRunDict[testName] = (
            str(aggregatedPipelineResults[testName]["numFailedRuns"])
            + " / "
            + str(aggregatedPipelineResults[testName]["numTotalRuns"])
        )

    return currentRunDict, aggregatedPipelineResults, testsData


# Sanitize dict
# Add "---" dict entries for test/branch combinations that did not even run 1 test
# Sort
def sanitizedDict(inputDict):
    dictList = copy.deepcopy(inputDict)
    for branch1 in dictList:
        for branch2_iter in range(len(dictList)):
            for key1 in branch1.keys():
                if key1 not in dictList[branch2_iter]:
                    dictList[branch2_iter][key1] = "---"
    dictList = sorted(
        dictList, key=lambda d: d["branch"]
    )  # Sort List of dicts by branch
    for i in range(len(dictList)):
        dictList[i] = dict(sorted(dictList[i].items()))
    return dictList


def runTableGeneration(nHours):
    # env = Env()
    # env.read_env(".env", recurse=False)
    # per_page = env.str("per_page")
    # personalAccessToken = env.str("personal_access_token")
    # since_relative = env.str("since_relative")
    personalAccessToken = 'bv1tgdd1JB2dzuTobKx-'
    per_page = 100
    since_relative = str(nHours) + " hours ago"
    branches = [
        ['master', 'staging', 'production', 'staging_aws', 'production_aws', 'tip-public', 'production_aws_s4llite_nonstop', 'production_aws_s4llite_parallel'],
        ['master', 'staging', 'production', 'staging_aws', 'production_aws'],
        ['master', 'dalco-staging', 'dalco-production', 'aws-staging', 'aws-production', 'tip.itis.swiss'],
        ['master'],
    ]
    test_repo_ids = [
        "300",
        "316",
        "525",
        "97"
    ]
    test_repo_names = [
        "e2e-testing",
        "e2e-portal-testing",
        "e2e-ops",
        "osparc-metrics",
    ]

    assert len(branches) == len(test_repo_ids)

    now = datetime.datetime.now()
    delta = now - dateparser.parse(since_relative, settings={"RELATIVE_BASE": now})
    since = now - delta

    omReposData = dict({
        "e2eData": []
    })

    for gitlabID_iter in range(len(test_repo_ids)):  # e2e p2e opse2e ...

        gitlabID = test_repo_ids[gitlabID_iter]
        gitlabName = test_repo_names[gitlabID_iter]
        dictListTestResultsNow = []
        dictListTestResultsIntervalBefore = []
        omRepoData = dict({
            "name": gitlabName,
            "link": "https://git.speag.com/oSparc/" + gitlabName + "/-/pipelines",
            "testsData": []
        })
        # For every branch (i.e. deployment)

        for branch_name in branches[gitlabID_iter]:
            print("Fetch ", gitlabName, branch_name)
            #
            #
            resultsNow = fetchGitlabCIResults(
                branch_name,
                gitlabID,
                gitlabName,
                since,
                now,
                personalAccessToken,
                per_page
            )
            dictListTestResultsNow.append(copy.deepcopy(resultsNow[0]))
            testsData = copy.deepcopy(resultsNow[2])
            omRepoData["testsData"].append(testsData)
            """"
            resultsIntervalBefore = fetchGitlabCIResults(
                branch_name,
                gitlabID,
                gitlabName,
                since - delta,
                since,
                personalAccessToken,
                per_page,
            )
            dictListTestResultsIntervalBefore.append(copy.deepcopy(resultsIntervalBefore[0]))
            """


        # DEBUGOUTPUT
        # with open('rawDict.dat','w') as ofile:
        #    ofile.write(str(dictListTestResults))

        dictListTestResultsNow = sanitizedDict(dictListTestResultsNow)
        # dictListTestResultsIntervalBefore = sanitizedDict(dictListTestResultsIntervalBefore)

        # DEBUGOUTPUT
        # with open('rawDict2.dat','w') as ofile:
        #    ofile.write(str(dictListTestResultsNow))

        omReposData["e2eData"].append(omRepoData)

    fileName = "omReposData_" + str(nHours) + "h.json";
    with open(fileName,'w') as outfile:
        json.dump(omReposData, outfile)
    print("output file written", fileName)

app = Rocketry()


@app.task("every 60 minutes")
def do_hourly():
    runTableGeneration(8)
    runTableGeneration(24)


if __name__ == "__main__":
    runTableGeneration(8)
    runTableGeneration(24)
    app.run()
