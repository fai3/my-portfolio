var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  nestedcss = require("postcss-nested"),
  mixins = require("postcss-mixins"),
  cssimport = require("postcss-import"),
  browserSync = require("browser-sync").create(),
  hexrgba = require("postcss-hexrgba"),
  webpack = require("webpack"),
  imagemin = require("gulp-imagemin"),
  usemin = require("gulp-usemin"),
  del = require("del"),
  rev = require("gulp-rev"),
  cssnano = require("gulp-cssnano"),
  uglify = require("gulp-uglify");

gulp.task("styles", () => {
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(
      postcss([cssimport, mixins, cssvars, nestedcss, hexrgba, autoprefixer])
    )
    .on("error", function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  watch("./app/index.html", () => {
    browserSync.reload();
  });
  watch("./app/assets/styles/**/*.css", () => {
    gulp.start("cssInject");
  });
  watch("./app/assets/scripts/**/*.js", () => {
    gulp.start("scriptsRefresh");
  });
});
gulp.task("cssInject", ["styles"], () => {
  return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream());
});
gulp.task("scripts", function(callback) {
  webpack(require("./webpack.config.js"), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});
gulp.task("scriptsRefresh", ["scripts"], function() {
  browserSync.reload();
});
gulp.task("previewDist", function() {
  browserSync.init({
    server: {
      baseDir: "doc"
    }
  });
});
gulp.task("deleteDist", function() {
  return del("./doc");
});
const pathToCopy = [
  "./app/**/*",
  "!./app/index.html",
  "!./app/assets/images/**",
  "!./app/assets/styless/**",
  "!./app/assets/scripts/**",
  "!./app/temp**",
  "!./app/temp/**"
];
gulp.task("copyGeneralFiles", ["deleteDist"], function() {
  return gulp.src(pathToCopy).pipe(gulp.dest("./doc"));
});
gulp.task("optimizeImages", ["deleteDist"], function() {
  return gulp
    .src("./app/assets/images/**/*")
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest("./doc/assets/images"));
});
gulp.task("useminTrigger", ["deleteDist"], function() {
  return gulp.start("usemin");
});
gulp.task("usemin", ["styles", "scripts"], function() {
  return gulp
    .src("./app/index.html")
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest("./doc"));
});
gulp.task("build", [
  "deleteDist",
  "copyGeneralFiles",
  "optimizeImages",
  "useminTrigger"
]);
