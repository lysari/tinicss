const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const ts = require("gulp-typescript");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const clean_css = require("gulp-clean-css");
const del = import("del");
const glob = import("glob");
const fs = require("fs");
const { getUtility } = require("./src/presets/utils");

const PATH = {
  DEV: "./tests/",
  BUILD: "./build",
};

exports.watch = function () {
  return gulp.watch(
    ["./tests/**/*.html", "!build/**"],
    gulp.series(["development"])
  );
};

function extractClass() {
  return new Promise(async (resolve, reject) => {
    let classList = [];
    (await glob)
      .glob(PATH.DEV + "**/*.html", {})
      .then((files) => {
        files.forEach((file) => {
          fs.readFile(file, "utf8", (err, data) => {
            if (err) reject(err);
            data.match(/class=\"(.*?)"/g)?.forEach((match) => {
              classList.push(
                ...match?.replace("class=", "")?.replaceAll('"', "")?.split(" ")
              );
            });
            resolve(classList);
          });
        });
      })
      .catch((err) => reject(err));
  });
}

gulp.task("development", function () {
  return new Promise((resolve) => {
    const tasks = {};
    extractClass()
      .then((data) => {
        console.log("re-building...");
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
});

function writeToFile(styles) {
  return new Promise((resolve) => {
    let css = "";
    Object.keys(styles).forEach(function (className) {
      css += `.${className} { ${styles[className]}; }\n`;
    });
    if (fs.existsSync("build")) {
      fs.rmSync("build", { recursive: true });
    }
    fs.mkdirSync("build");
    fs.mkdirSync("build/css");
    fs.appendFileSync("build/css/app.css", css);
    console.log("success re-build. reload browser to see changes!");
    resolve();
  });
}

exports.build = gulp.series(
  async function clean() {
    (await del).deleteAsync(PATH.BUILD);
  },
  function style() {
    return new Promise((resolve) => {
      gulp
        .src(["**/*.scss", "**/*.css", "!build/**"])
        .pipe(concat("app.scss"))
        .pipe(sass().on("error", sass.logError))
        .pipe(clean_css({ compatibility: "ie8" }))
        .pipe(gulp.dest(PATH.BUILD + "/css"))
        .on("end", resolve);
    });
  },
  function scripts() {
    return new Promise((resolve) => {
      const gulpTS = ts.createProject("tsconfig.json");
      gulpTS
        .src()
        .pipe(concat("app.ts"))
        .pipe(gulpTS())
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(PATH.BUILD + "/js"))
        .on("end", resolve);
    });
  }
);
