/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

/**
 * This is the main application class of "batman"
 *
 * @asset(batman/*)
 */

qx.Class.define("batman.Application", {
  extend: qx.application.Standalone,

  members: {
    main() {
      // Call super class
      super.main();

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      const doc = this.getRoot();
      doc.setFont("text-16");

      const tabView = new qx.ui.tabview.TabView().set({
        contentPadding: 10
      });

      doc.add(tabView, {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      });

      const tabPage8h = this.__createTabPage("8h");
      const panel8h = new batman.Panel("8h");
      tabPage8h.add(panel8h, {
        flex: 1
      });
      tabView.add(tabPage8h);

      const tabPage24h = this.__createTabPage("24h");
      const panel24h = new batman.Panel("24h");
      tabPage24h.add(panel24h, {
        flex: 1
      });
      tabView.add(tabPage24h);

      const plotyWrapper = batman.plotly.PlotlyWrapper.getInstance();
      plotyWrapper.addListener("changeLibReady", e => {
        if (e.getData()) {
          batman.TestData.getTestData(8)
            .then(testData => {
              if (testData) {
                panel8h.setTestsData(testData["e2eData"]);
              }
            });
          batman.TestData.getTestData(24)
            .then(testData => {
              if (testData) {
                panel24h.setTestsData(testData["e2eData"]);
              }
            });
        }
      });
      plotyWrapper.init();
    },

    __createTabPage: function(title) {
      const tabPage = new qx.ui.tabview.Page(title).set({
        layout: new qx.ui.layout.VBox(0),
      });
      const tabButton = tabPage.getChildControl("button");
      tabButton.set({
        textColor: "text"
      });
      return tabPage;
    }
  }
});
