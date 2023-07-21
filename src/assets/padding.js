const { combineModelByKey, getModel } = require("../libs/tools");
const { SIZE, TOP, RIGHT, BOTTOM, LEFT } = require("./common");

//Set the name of the utility
const NAME = "padding";
const NAME_DASH = NAME + "-";
const NAME_COLON = NAME + ":";
const NAME_DASH_LEFT_COLON = NAME + "-left:";
const NAME_DASH_RIGHT_COLON = NAME + "-right:";
const NAME_DASH_TOP_COLON = NAME + "-top:";
const NAME_DASH_BOTTOM_COLON = NAME + "-bottom:";

module.exports = function () {
  return {
    p: {
      ...getModel(NAME_COLON, SIZE),
      _custom: NAME_COLON,
    },
    pt: getModel(NAME_DASH, TOP),
    pr: getModel(NAME_DASH, RIGHT),
    pb: getModel(NAME_DASH, BOTTOM),
    pl: getModel(NAME_DASH, LEFT),
    py: {
      ...combineModelByKey(
        getModel(NAME_DASH, TOP),
        getModel(NAME_DASH, BOTTOM)
      ),
      _custom: [NAME_DASH_TOP_COLON, NAME_DASH_BOTTOM_COLON],
    },
    px: {
      ...combineModelByKey(
        getModel(NAME_DASH, LEFT),
        getModel(NAME_DASH, RIGHT)
      ),
      _custom: [NAME_DASH_LEFT_COLON, NAME_DASH_RIGHT_COLON],
    },
  };
};
