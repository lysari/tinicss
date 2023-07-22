const glob = import("glob");
const fs = require("fs");
const { getUtility } = require("./utils");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const CONFIG = require(process.cwd() + "/tinicss.config.js");
const mediaScreen = require("./media/screen");
const Event = require("./event/hover");

const PATH = {
  CONTENT: CONFIG.content,
  BUILD: CONFIG.output || "./build",
};

function start() {
  return new Promise((resolve) => {
    const tasks = [];
    extractClass()
      .then((data) => {
        const classList = [...new Set(data)];
        classList.map((item) => {
          const style = getUtility(item);
          if (style) tasks.push(style);
        });
      })
      .catch((err) => console.log(err))
      .finally(() => writeToFile(tasks).finally(resolve));
  });
}

function extractClass() {
  return new Promise(async (resolve, reject) => {
    let classList = [];
    (await glob)
      .glob(PATH.CONTENT, {})
      .then((files) => {
        files.forEach((file) => {
          fs.readFile(file, "utf8", (err, htmlString) => {
            if (err) reject(err);
            const dom = new JSDOM(htmlString);
            const document = dom.window.document;
            document.querySelectorAll("*").forEach((el) => {
              classList.push(...el.classList);
            });
            resolve(classList);
          });
        });
      })
      .catch((err) => reject(err));
  });
}

/**
 * Writes the given styles to a file.
 *
 * @param {Array} styles - The styles to be written to the file.
 * @return {Promise<void>} A Promise that resolves when the styles have been written to the file.
 */
function writeToFile(styles) {
  console.log("re-building...");
  return new Promise((resolve) => {
    build(styles);
    resolve();
    console.log("success re-build. reload browser to see changes!");
  });
}

/**
 * Builds the application, removes any existing build directory, creates a new one,
 * compiles the CSS classes from the given styles object with `prepareClasses()`, and
 * writes the result to `build/css/app.css`. A success message is printed to the console.
 *
 * @param {object} styles - The object containing the styles to compile.
 * @return {undefined}
 */
function build(styles) {
  if (fs.existsSync(PATH.BUILD)) {
    fs.rmSync(PATH.BUILD, { recursive: true });
  }
  fs.mkdirSync(PATH.BUILD);
  fs.mkdirSync(PATH.BUILD + "/css");
  fs.appendFileSync(PATH.BUILD + "/css/app.css", prepareClasses(styles));
}

/**
 * Generates a CSS string of classes based on given styles object.
 *
 * @param {Object} styles - Object with class names as keys and style definitions as values.
 * @return {string} CSS string with valid class definitions.
 */
function prepareClasses(styles) {
  return prepareScreen(styles);
}

/**
 * Responsive.
 *
 * @param {Object} styles - Object with class names as keys and style definitions as values.
 * @return {string} CSS string with valid class definitions.
 * @private
 * @example
 **/
function prepareScreen(styles) {
  const screen = styles.reduce((r, a) => {
    r[a.screen] = [...(r[a.screen] || []), a];
    return r;
  }, {});
  let css = "";
  Object.keys(screen).forEach((key) => {
    if (mediaScreen[key]) {
      css += `@media (min-width: ${mediaScreen[key].min}) {\n`;
      screen[key].forEach(function (item) {
        css += checkClassName(item);
      });
      css += "}\n";
    } else {
      screen[key].forEach(function (item) {
        css += checkClassName(item);
      });
    }
  });
  return css;
}

/**
 * Replaces characters in the className string for proper CSS selector syntax.
 *
 * @param {string} name - The class name string to be formatted
 * @param {string} value - The value to be assigned to the formatted string
 * @return {string} The formatted CSS class selector string
 */
function checkClassName(item) {
  if (!item.class?.value) return "";
  const s = item.class?.isImportant ? " !important" : "";
  const elEvent = prepareEvent(item);
  console.log(elEvent);
  if (typeof elEvent === Boolean) return "";
  return `.${item.key + elEvent} { ${item.class?.value}${s}; }\n`;
}

function prepareEvent(item) {
  if (item.event) {
    if (Event[item.event]) {
      return `${Event[item.event]}`;
    } else {
      return false;
    }
  }
  return "";
}

module.exports = { start };
