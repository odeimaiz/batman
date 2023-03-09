/* ************************************************************************

   Copyright: 2023 undefined

   License: MIT license

   Authors:
    * Odei Maiz (odeimaiz)

************************************************************************ */

qx.Class.define("batman.Panel", {
  extend: qx.ui.core.Widget,

  construct: function(panelId) {
    this.base(arguments);

    if (panelId) {
      this.setPanelId(panelId);
    }

    const layout = new qx.ui.layout.Grid(10, 10);
    this._setLayout(layout);
  },

  properties: {
    panelId: {
      check: "String",
      nullable: true
    },

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
      testsData.forEach((data, idx) => {
        data.testsData.forEach(testData => {
          let branchIdx = -1;
          for (const [index, [, value]] of Object.entries(Object.entries(batman.TestData.BRANCH_NAMES_ALIAS))) {
            if (value.includes(testData.branch)) {
              branchIdx = parseInt(index);
              continue;
            }
          }
          if (branchIdx > -1) {
            const cardId = this.getPanelId() + "_" + testData.testId + "-" + testData.branch;
            const cardSmall = new batman.TestCardSmall(cardId, testData);
            this._add(cardSmall, {
              row: branchIdx+1,
              column: idx+1
            });
          }
        });
      });
    }
  }
});
