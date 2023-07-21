const { getColor } = require("../libs/tools");
const { palette } = require("../themes/color");

const BACKGROUND = {
  bg: {
    transparent: "background-color:transparent",
    current: "background-color:currentColor",
    unset: "background-color:unset",
    ...getColor(palette, "background-"),
    _custom: "background-color:",
  },
};
module.exports = {
  ...BACKGROUND,
};
