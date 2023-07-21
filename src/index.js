const glob = import("glob");
const fs = require("fs");
const { getUtility } = require("./utils");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const CONFIG = require(process.cwd() + "/tini.config.js");
const PATH = {
  CONTENT: CONFIG.content,
  BUILD: CONFIG.output || "./build",
};

function start() {
  return new Promise((resolve) => {
    const tasks = {};
    extractClass()
      .then((data) => {
        const classList = [...new Set(data)];
        classList.map((item) => {
          const [name, attr, value] = item.split("-");
          const style = getUtility(name, attr, value);
          if (style) tasks[item] = style;
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
  let css = "";
  Object.keys(styles).forEach(function (className) {
    css += checkClassName(className, styles[className]);
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
function checkClassName(name, value) {
  //add \ before any special characters only in []
  const n = name.replace(/[!\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\%]/g, "\\$&");
  const s = name.match(/^!/) ? " !important" : "";
  return `.${n} { ${value}${s}; }\n`;
}

module.exports = { start };
