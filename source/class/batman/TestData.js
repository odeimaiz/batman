/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

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

    getDummyData: function() {
      const dummyData = [];
      dummyData.push(this.__e2eData());
      dummyData.push(this.__p2eData());
      return dummyData;
    },

    __e2eData: function() {
      return {
        name: "e2e-osparc",
        link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines",
        testsData: [{
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
          branch: "tip-public",
          link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines?page=1&scope=all&ref=staging",
          nTests: 24,
          tests: [{
            name: "ti-plan",
            failed: 2
          }]
        }, {
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
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
          testId: "e2e-osparc",
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

    __p2eData: function() {
      return {
        name: "p2e-osparc",
        link: "https://git.speag.com/oSparc/e2e-testing/-/pipelines",
        testsData: [{
          testId: "p2e-osparc",
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
