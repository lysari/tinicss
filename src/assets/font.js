const { getModel } = require("../libs/tools");
const { fonts } = require("../themes/custom");

const FONT = {
  font: {
    semibold: "font-weight:600",
    bold: "font-weight:700",
    _custom: "font-weight:",
    ...getModel("font-weight:", fonts.weight),
    ...getModel("font-family:", fonts.family),
  },
};
module.exports = {
  ...FONT,
};
