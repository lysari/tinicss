const { getModel } = require("../libs/tools");

const WIDTH = {
  full: "width:100%",
  half: "width:50%",
  _custom: "width:",
};

const HEIGHT = {
  full: "height:100%",
  half: "height:50%",
  _custom: "height:",
};

const MAX = {
  max: {
    w: getModel("max-", WIDTH),
    h: getModel("max-", HEIGHT),
  },
};

const MIN = {
  min: {
    w: getModel("min-", WIDTH),
    h: getModel("min-", HEIGHT),
  },
};

module.exports = {
  w: WIDTH,
  h: HEIGHT,
  ...MAX,
  ...MIN,
};
