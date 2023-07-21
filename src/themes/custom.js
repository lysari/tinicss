const CONFIG = require(process.cwd() + "/tinicss.config.js");
const CUSTOM = {
  colors: CONFIG?.custom?.colors || {},
  fonts: {
    family: CONFIG?.custom?.fonts?.family || {},
    size: CONFIG?.custom?.fonts?.size || {},
    weight: CONFIG?.custom?.fonts?.weight || {},
  },
};
module.exports = {
  ...CUSTOM,
};
