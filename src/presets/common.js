const { getModel } = require("../libs/tools");
const SIZE = {
  1: "1rem",
  2: "2rem",
  3: "3rem",
  4: "4rem",
  5: "5rem",
  auto: "auto",
};

const LEFT = {
  ...getModel("left:", SIZE),
  _custom: "left:",
};

const RIGHT = {
  ...getModel("right:", SIZE),
  _custom: "right:",
};

const TOP = {
  ...getModel("top:", SIZE),
  _custom: "top:",
};

const BOTTOM = {
  ...getModel("bottom:", SIZE),
  _custom: "bottom:",
};

module.exports = {
  SIZE,
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
};
