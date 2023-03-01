/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

qx.Class.define("batman.TestCardSmall", {
  extend: qx.ui.core.Widget,

  construct: function(testData) {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Canvas());

    // no data
    this.setBackgroundColor("gray");

    if (testData) {
      this.setTestData(testData);
    }
  },

  properties: {
    testData: {
      check: "Object",
      nullable: true,
      apply: "__populateTestData"
    }
  },

  members: {
    __populateTestData: function(testData) {
      // yes data
      this.setBackgroundColor(qx.theme.manager.Color.getInstance().resolve("background"));

      const plotId = testData.testId + "-" + testData.branch;
      const data = [{
        x: [],
        y: [],
        type: 'bar',
        marker: {
          color: 'red'
        }
      }];
      let nTests = 50;
      testData.tests.forEach(test => {
        // filter out parallels
        if (test.name.includes("parallel_users")) {
          return;
        }
        data[0].x.push(test.name);
        data[0].y.push(test.failed);
        nTests = test.runs
      });
      const layout = {
        ...batman.plotly.PlotlyWrapper.getDefaultLayout(),
        yaxis: {
          showgrid: false,
          range: [0, nTests],
        }
      };
      const plot = new batman.plotly.PlotlyWidget(plotId, data, layout);
      this._add(plot, {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
    }
  }
});
