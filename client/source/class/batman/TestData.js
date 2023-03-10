/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

/**
 * @asset(data/*)
 * @ignore(fetch)
 */

qx.Class.define("batman.TestData", {
  type: "static",

  statics: {
    BRANCH_NAMES: [
      "master",
      "staging",
      "production",
      "tip-public",
      "staging_aws",
      "production_aws",
      "production_aws_s4llite_nonstop",
      "production_aws_s4llite_parallel",
    ],

    BRANCH_NAMES_ALIAS: {
      "master": ["master", "osparc-master.speag.com"],
      "staging": ["staging", "dalco-staging"],
      "production": ["production", "dalco-production"],
      "tip-public": ["tip-public", "tip.itis.swiss"],
      "staging_aws": ["staging_aws", "aws-staging"],
      "production_aws": ["production_aws", "aws-production"],
      "production_aws_s4llite_nonstop": ["production_aws_s4llite_nonstop"],
      "production_aws_s4llite_parallel": ["production_aws_s4llite_parallel"],
    },

    getTestData: function(nHours) {
      return new Promise((resolve, reject) => {
        fetch("resource/data/omReposData_" + nHours + "h.json", {
          headers: {
            'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(json => resolve(json))
          .catch(err => reject(err));
      });
    },

    getDummyData: function() {
      const dummyData = [];
      dummyData.push(this.__e2eDummyData());
      dummyData.push(this.__p2eDummyData());
      return dummyData;
    },

    __e2eDummyData: function() {
      return {
        name: "e2e-testing",
        link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines",
        testsData: [{
          testId: "e2e-testing",
          branch: "master",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=master",
          nTests: 24,
          tests: [{
            name: "sleepers",
            failed: 0
          }, {
            name: "jupyterlabs",
            failed: 5
          }, {
            name: "isolve-gpu",
            failed: 5
          }, {
            name: "isolve-mpi",
            failed: 10
          }, {
            name: "ti-plan",
            failed: 15
          }, {
            name: "sim4life-osparc",
            failed: 15
          }, {
            name: "sim4life-s4l",
            failed: 15
          }, {
            name: "sim4life-s4l-lite",
            failed: 15
          }, {
            name: "parallel users",
            failed: 24
          }, {
            name: "check_all_puppeteers",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "staging",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "sleepers",
            failed: 0
          }, {
            name: "jupyterlabs",
            failed: 5
          }, {
            name: "isolve-gpu",
            failed: 5
          }, {
            name: "isolve-mpi",
            failed: 10
          }, {
            name: "ti-plan",
            failed: 15
          }, {
            name: "sim4life-osparc",
            failed: 15
          }, {
            name: "sim4life-s4l",
            failed: 15
          }, {
            name: "sim4life-s4l-lite",
            failed: 15
          }, {
            name: "parallel users",
            failed: 24
          }, {
            name: "check_all_puppeteers",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "production",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "sleepers",
            failed: 5
          }, {
            name: "jupyterlabs",
            failed: 2
          }, {
            name: "isolve-gpu",
            failed: 6
          }, {
            name: "isolve-mpi",
            failed: 11
          }, {
            name: "ti-plan",
            failed: 12
          }, {
            name: "sim4life-osparc",
            failed: 8
          }, {
            name: "sim4life-s4l",
            failed: 3
          }, {
            name: "sim4life-s4l-lite",
            failed: 3
          }, {
            name: "parallel users",
            failed: 5
          }, {
            name: "check_all_puppeteers",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "tip-public",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "ti-plan",
            failed: 2
          }]
        }, {
          testId: "e2e-testing",
          branch: "staging_aws",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "sleepers",
            failed: 5
          }, {
            name: "jupyterlabs",
            failed: 2
          }, {
            name: "sim4life-s4l-lite",
            failed: 3
          }, {
            name: "sim4life-s4l-lite-parallel",
            failed: 3
          }, {
            name: "parallel users",
            failed: 5
          }, {
            name: "check_all_puppeteers",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "production_aws",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "sleepers",
            failed: 5
          }, {
            name: "jupyterlabs",
            failed: 2
          }, {
            name: "sim4life-s4l-lite",
            failed: 3
          }, {
            name: "parallel users",
            failed: 5
          }, {
            name: "check_all_puppeteers",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "production_aws_s4llite_nonstop",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 96,
          tests: [{
            name: "sim4life-s4l-lite",
            failed: 0
          }, {
            name: "jupyterlabs",
            failed: 0
          }]
        }, {
          testId: "e2e-testing",
          branch: "production_aws_s4llite_parallel",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 6,
          tests: [{
            name: "sim4life-s4l-parallel",
            failed: 3
          }, {
            name: "jupyterlabs",
            failed: 1
          }]
        }]
      }
    },

    __p2eDummyData: function() {
      return {
        name: "e2e-portal-testing",
        link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines",
        testsData: [{
          testId: "e2e-portal-testing",
          branch: "master",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=master",
          nTests: 6,
          tests: [{
            name: "sleepers_api_example",
            failed: 0
          }, {
            name: "web_responsivity",
            failed: 1
          }, {
            name: "3D_em",
            failed: 2
          }, {
            name: "3D_anatomical",
            failed: 3
          }, {
            name: "mattward",
            failed: 4
          }, {
            name: "bornstein",
            failed: 5
          }, {
            name: "2d_plot",
            failed: 6
          }, {
            name: "opencor",
            failed: 5
          }, {
            name: "kember",
            failed: 4
          }, {
            name: "cc-rabbit",
            failed: 3
          }, {
            name: "cc-human",
            failed: 2
          }, {
            name: "vtk_dispatcher",
            failed: 1
          }, {
            name: "all-potal-links",
            failed: 0
          }]
        }]
      }
    },
  }
});
