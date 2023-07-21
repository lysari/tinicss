const { getModel } = require("../libs/tools");
const { SIZE } = require("../presets/common");

//Set the name of the utility
const NAME = "gap";
const NAME_COLON = NAME + ":";
const COL_DASH_NAME_COLON = "column-" + NAME + ":";
const ROW_DASH_NAME_COLON = "row-" + NAME + ":";

module.exports = {
  gap: {
    ...getModel(NAME_COLON, SIZE),
    row: {
      ...getModel(ROW_DASH_NAME_COLON, SIZE),
      _custom: ROW_DASH_NAME_COLON,
    },
    col: {
      ...getModel(COL_DASH_NAME_COLON, SIZE),
      _custom: COL_DASH_NAME_COLON,
    },
    _custom: NAME_COLON,
  },
};
