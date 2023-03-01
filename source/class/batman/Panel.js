/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

qx.Class.define("batman.Panel", {
  extend: qx.ui.core.Widget,

  construct: function() {
    this.base(arguments);

    const layout = new qx.ui.layout.Grid(10, 10);
    this._setLayout(layout);
  },

  properties: {
    testsData: {
      check: "Object",
      nullable: true,
      apply: "__populatePanel"
    }
  },

  members: {
    __populatePanel: function(testsData) {
      this.__populateHeaders(testsData);
      this.__populateTestsData(testsData);
    },

    __populateHeaders: function(testsData) {
      const layout = this._getLayout();
      // populate headers (test types)
      testsData.forEach((data, idx) => {
        const testLabel = new qx.ui.basic.Label(data.name).set({
          alignX: "center",
          alignY: "middle",
        });
        this._add(testLabel, {
          row: 0,
          column: idx+1
        });
        layout.setColumnFlex(idx+1, 1);
      });

      // populate row headers (branchIds)
      const branchNames = batman.TestData.BRANCH_NAMES;
      branchNames.forEach((branchName, idx) => {
        const branchLabel = new qx.ui.basic.Label(branchName).set({
          alignX: "center",
          alignY: "middle"
        });
        this._add(branchLabel, {
          row: idx+1,
          column: 0
        });
        layout.setRowFlex(idx+1, 1);
      });
    },

    __populateTestsData: function(testsData) {
      console.log(testsData);
      testsData.forEach((data, idx) => {
        data.testsData.forEach(testData => {
          const branchIdx = batman.TestData.BRANCH_NAMES.indexOf(testData.branch)
          const cardSmall = new batman.TestCardSmall(testData);
          this._add(cardSmall, {
            row: branchIdx+1,
            column: idx+1
          });
        });
      });
    }
  }
});
