var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nestedcss = require('postcss-nested'),
mixins = require('postcss-mixins'),
cssimport = require('postcss-import'),
browserSync = require('browser-sync').create(),
hexrgba = require('postcss-hexrgba'),
webpack = require('webpack');

gulp.task('styles', () => {
   return gulp.src('./app/assets/styles/styles.css')
   .pipe(postcss([cssimport, mixins, cssvars, nestedcss, hexrgba, autoprefixer]))
   .on('error', function (errorInfo){
       console.log(errorInfo.toString());
       this.emit('end');
   })
   .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir : "app"
        }
    });
 watch('./app/index.html', () => {
   browserSync.reload();
    });
watch('./app/assets/styles/**/*.css', () =>{
     gulp.start('cssInject');
    });
watch('./app/assets/scripts/**/*.js', () =>{
    gulp.start('scriptsRefresh');
    });
});
gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream());
});
gulp.task('scripts', function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) {
console.log(err.toString());
        }


        console.log(stats.toString());
        callback();
    });
});
gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
});