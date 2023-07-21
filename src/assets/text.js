const { getColor } = require("../libs/tools");
const { palette } = require("../themes/color");

const TEXT = {
  text: {
    center: "text-align:center",
    left: "text-align:left",
    right: "text-align:right",
    ...getColor(palette, ""),
    _custom: "font-size:",
  },
};
module.exports = {
  ...TEXT,
};
