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

      const panel = new batman.Panel();
      doc.add(panel, {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      });

      const plotyWrapper = batman.plotly.PlotlyWrapper.getInstance();
      plotyWrapper.addListener("changeLibReady", e => {
        if (e.getData()) {
          const dummyData = batman.TestData.getDummyData();
          panel.setTestsData(dummyData);
        }
      });
      plotyWrapper.init();
    }
  }
});
