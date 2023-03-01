/* ************************************************************************

   osparc - the simcore frontend

   https://osparc.io

   Copyright:
     2022 IT'IS Foundation, https://itis.swiss

   License:
     MIT: https://opensource.org/licenses/MIT

   Authors:
     * Odei Maiz (odeimaiz)

************************************************************************ */

/* global Plotly */

/**
 * @asset(plotly/plotly-2.18.2.min.js)
 * @ignore(Plotly)
 */

qx.Class.define("batman.plotly.PlotlyWrapper", {
  extend: qx.core.Object,
  type: "singleton",

  properties: {
    libReady: {
      check: "Boolean",
      init: false,
      nullable: false,
      event: "changeLibReady"
    }
  },

  statics: {
    NAME: "Plotly",
    VERSION: "2.18.2",
    URL: "https://github.com/plotly/plotly.js",

    createEmptyPlot: function(plotId, config) {
      return batman.plotly.PlotlyWrapper.getInstance().createEmptyPlot(plotId, config);
    },

    setLayout: function(plotId, data) {
      return batman.plotly.PlotlyWrapper.getInstance().setLayout(plotId, data);
    },

    setData: function(plotId, data) {
      return batman.plotly.PlotlyWrapper.getInstance().setData(plotId, data);
    },

    getDefaultLayout: function() {
      const textColor = qx.theme.manager.Color.getInstance().resolve("text");
      const titleFont = {
        size: 12,
        family: ["Roboto", "sanf-serif"],
        color: "black"
      };
      const textFont = {
        size: 9,
        family: ["Roboto", "sanf-serif"],
        color: "black"
      };
      const margin = 5;
      return {
        autoscale: true,
        titlefont: {
          color: textColor,
          size: titleFont["size"],
          family: titleFont["family"]
        },
        font: {
          color: textColor,
          size: textFont["size"],
          family: textFont["family"]
        },
        xaxis: {
          showticklabels: false,
          showgrid: false,
        },
        margin: {
          l: margin,
          r: margin,
          t: margin,
          b: margin,
          pad: margin
        },
        "paper_bgcolor":'rgba(0,0,0,0)',
        "plot_bgcolor": 'rgba(0,0,0,0)'
      };
    }
  },

  members: {
    init: function() {
      if (this.isLibReady()) {
        return;
      }

      // initialize the script loading
      const plotlyPath = "plotly/plotly-2.18.2.min.js";
      const dynLoader = new qx.util.DynamicScriptLoader([
        plotlyPath
      ]);

      dynLoader.addListenerOnce("ready", () => {
        console.log(plotlyPath + " loaded");
        this.setLibReady(true);
      }, this);

      dynLoader.addListener("failed", e => {
        const data = e.getData();
        console.error("failed to load " + data.script);
        this.setLibReady(false);
      }, this);

      dynLoader.start();
    },

    createEmptyPlot: function(plotId, config = {}) {
      const emptyData = [];
      const emptyLayout = this.self().getDefaultLayout();
      Plotly.newPlot(plotId, emptyData, emptyLayout, config);
      return {
        emptyData,
        emptyLayout
      };
    },

    setData: function(plotId, data) {
      Plotly.react(plotId, data);
    },

    setLayout: function(plotId, layout) {
      Plotly.relayout(plotId, layout);
    }
  }
});
