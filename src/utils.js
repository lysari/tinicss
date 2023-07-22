const model = require("./register");
const screen = require("./media/screen");
const event = require("./event/hover");
const {
  isObject,
  isUndefinedValue,
  isValidValue,
  isCustomUtility,
  isHasCustomUtility,
  removeImportant,
} = require("./libs/tools");
/**
 * Returns a utility value from the model object.
 *
 * @param {...*} args - Variable number of arguments for the utility value
 * @returns {*} The utility value or undefined if not found
 */
function getUtility(args) {
  const group = args.split(":");
  const classContent = group.map((i) => i.split("-"));
  let p = classContent.filter(Boolean);
  let dataSet = {
    key: getKey(args),
    screen: getScreen(p),
    event: getEvent(p),
    class: getClass(p),
  };
  return dataSet;
}

function getKey(p) {
  const keyName = p.replace(/[!\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\%\:\,]/g, "\\$&");
  const nameStartWithNumber = keyName.replace(/^[0-9]/g, "\\$&");
  return nameStartWithNumber;
}

function getScreen(p) {
  const match = p.find((item) => screen[item]);
  return match ? match[0] : null;
}

function getEvent(p) {
  const match = p.find((item) => event[item]);
  return match ? match[0] : null;
}

function getClass(p) {
  const match = p.find((item) => model[removeImportant(item[0])]);
  if (match) {
    return {
      value: getClassTree(match.map((item) => removeImportant(item))),
      isImportant: match.some((item) => item.startsWith("!")),
    };
  }
  return null;
}

function getClassTree(classList) {
  let value = model;
  classList.map((item, index) => {
    try {
      if (isCustomUtility(item) && isHasCustomUtility(value)) {
        value = __custom(item, value?._custom);
      } else {
        if (typeof value === "string") {
          return (value = null);
        } else {
          value = value[item];
        }
        if (isUndefinedValue(value)) return (value = null);
        if (index === classList.length - 1) {
          if (value._default) {
            value = value._default;
          } else {
            value = value;
          }
        }
      }
    } catch (e) {
      value = null;
    }
  });
  return value;
}

const __custom = (item, customs) => {
  const value = item.replaceAll(/\[/g, "").replaceAll(/\]/g, "");
  if (!Array.isArray(customs)) return customs + value;
  else return customs.map((custom) => custom + value).join(";");
};

module.exports = { getUtility };
