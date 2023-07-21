const gulp = require("gulp");
const { start } = require("./src/index");
const CONFIG = require(process.cwd() + "/tinicss.config.js");
const PATH = {
  CONTENT: CONFIG.content,
  BUILD: CONFIG.output || "./build",
};
exports.watch = function () {
  return gulp.watch(PATH.CONTENT, gulp.series(["development"]));
};
gulp.task("development", start);
