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
      const traceSuccess = {
        x: [],
        y: [],
        type: "bar",
        marker: {
          color: "green"
        }
      };
      const traceFailure = {
        x: [],
        y: [],
        type: "bar",
        marker: {
          color: "red"
        }
      };
      testData.tests.forEach(test => {
        // filter out parallels
        if (test.name.includes("[") && test.name.includes("]")) {
          return;
        }
        if (!("runs" in test) || test.runs === 0) {
          return;
        }
        traceSuccess.x.push(test.name);
        traceSuccess.y.push(test.runs-test.failed);
        traceFailure.x.push(test.name);
        traceFailure.y.push(test.failed);
      });
      const layout = {
        ...batman.plotly.PlotlyWrapper.getDefaultLayout(),
        barmode: "stack",
        yaxis: {
          showgrid: false,
        },
        showlegend: false
      };
      const data = [traceFailure, traceSuccess];
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
