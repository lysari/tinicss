const { getColor } = require("../libs/tools");
const { palette } = require("../themes/color");

const BORDER = {
  border: {
    _default: "border-width:1px",
    none: "border:none",
    solid: "border-style:solid",
    dashed: "border-style:dashed",
    dotted: "border-style:dotted",
    sm: "border-width:1px",
    md: "border-width:2px",
    lg: "border-width:4px",
    xl: "border-width:8px",
    ...getColor(palette, "border-"),
    _custom: "border-width:",
  },
};
module.exports = {
  ...BORDER,
};
