const margin = require("./assets/margin");
const padding = require("./assets/padding");
const size = require("./assets/size");
const position = require("./assets/position");
const shadow = require("./assets/shadow");
const rounded = require("./assets/rounded");
const display = require("./assets/display");
const border = require("./assets/border");
const background = require("./assets/background");
const text = require("./assets/text");
const font = require("./assets/font");

module.exports = {
  ...size,
  ...position,
  ...shadow,
  ...rounded,
  ...display,
  ...border,
  ...margin,
  ...padding,
  ...position,
  ...background,
  ...text,
  ...font,
};
