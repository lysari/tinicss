const model = require("./presets/model");
const {
  isObject,
  isUndefinedValue,
  isValidValue,
  isCustomUtility,
  isHasCustomUtility,
} = require("./libs/tools");
/**
 * Returns a utility value from the model object.
 *
 * @param {...*} args - Variable number of arguments for the utility value
 * @returns {*} The utility value or undefined if not found
 */
function getUtility(...args) {
  let [n, p, v] = args.filter(Boolean);
  n = n.charAt(0) === "!" ? n?.replaceAll(/\!/g, "") : n;
  return checkName(n, p, v);
}

function checkName(n, p, v) {
  if (isObject(model[n])) {
    return checkProperty(n, p, v);
  } else return model[n];
}

function checkProperty(n, p, v) {
  if (isObject(model[n][p])) {
    return checkValue(n, p, v);
  } else if (isCustomUtility(p) && isHasCustomUtility(model[n])) {
    return customUtility(n, p, v);
  } else {
    if (isUndefinedValue(p)) return model[n]?._default;
    else if (isValidValue(p) && isUndefinedValue(v)) return model[n][p];
  }
}

function checkValue(n, p, v) {
  if (isValidValue(v)) return model[n][p][v];
  else if (isCustomUtility(v) && isHasCustomUtility(model[n][p])) {
    return customUtility(n, p, v);
  } else return;
}

const customUtility = (n, p, v) => {
  if (isCustomUtility(p)) {
    if (!isUndefinedValue(v)) return;
    const value = p.replaceAll(/\[/g, "").replaceAll(/\]/g, "");
    if (!value) return;
    if (isObject(model[n][p])) {
      return __custom(model[n][p]?._custom, value);
    } else return __custom(model[n]?._custom,value);
  } else if (isCustomUtility(v)) {
    const value = v.replaceAll(/\[/g, "").replaceAll(/\]/g, "");
    if (!value) return;
    return __custom(model[n][p]?._custom, value);
  } else return;
};

const __custom = (customs, value) => {
  if (!Array.isArray(customs)) return customs + value;
  else return customs.map((custom) => custom + value).join(";");
};

module.exports = { getUtility };
