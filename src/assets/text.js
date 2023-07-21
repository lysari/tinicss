const { getColor, getModel } = require("../libs/tools");
const { palette } = require("../themes/color");
const { fonts } = require("../themes/custom");

const TEXT = {
  text: {
    center: "text-align:center",
    left: "text-align:left",
    right: "text-align:right",
    ...getColor(palette, ""),
    _custom: "font-size:",
    ...getModel("font-size:", fonts.size),
  },
};
module.exports = {
  ...TEXT,
};
