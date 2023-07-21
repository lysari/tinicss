const { TOP, RIGHT, BOTTOM, LEFT } = require("../presets/common");

const POSITION = {
  relative: "position:relative",
  absolute: "position:absolute",
  fixed: "position:fixed",
  sticky: "position:sticky",
};

module.exports = {
  ...POSITION,
  t: TOP,
  r: RIGHT,
  b: BOTTOM,
  l: LEFT,
};
