/**
 * Recursively generates CSS color rules for an object of color definitions.
 *
 * @param {object} cl - An object containing color definitions.
 * @param {string} p - A string containing the CSS property name to be used.
 * @return {object} An object containing CSS color rules.
 */
function getColor(cl, p) {
  const cs = {};
  Object.keys(cl).map((k) => {
    cs[k] = isObject(cl[k]) ? getColor(cl[k], p) : `${p}color:${cl[k]}`;
  });
  return cs;
}

function getModel(p, m) {
  const cs = {};
  Object.keys(m).map((k) => {
    cs[k] = isObject(m[k]) ? getColor(m[k], p) : `${p}${m[k]}`;
  });
  return cs;
}

const isValidValue = (v) =>
  v !== "_default" && v !== "_custom" && !isCustomUtility(v);

const isUndefinedValue = (v) => typeof v === "undefined" && v === undefined;

/**
 * Checks if the input is an object.
 *
 * @param {any} obj - The input to check.
 * @returns {boolean} - True if the input is an object, false otherwise.
 */
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

const isCustomUtility = (p) => p && p.startsWith("[") && p.endsWith("]");
const isHasCustomUtility = (obj) => obj?._custom;
const combineModelByKey = (...models) => {
  const result = {};
  models.forEach((model) => {
    Object.keys(model).forEach((key) => {
      if (isValidValue(key)) {
        if (result[key]) {
          result[key] = `${result[key]}; ${model[key]}`;
        } else {
          result[key] = model[key];
        }
      }
    });
  });
  return result;
};
const removeImportant = (value) => value.replace(/!/g, "");

module.exports = {
  getColor,
  getModel,
  isObject,
  isValidValue,
  isUndefinedValue,
  isCustomUtility,
  isHasCustomUtility,
  combineModelByKey,
  removeImportant
};
