const gulp = require('gulp');
const { src, dest, task, series, watch, parallel} = require("gulp")
const sass = require('gulp-sass')(require('sass'));
const autoPref = require('gulp-autoprefixer')
const sourceMaps =  require ('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')

var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

task ('styles', function() {
    return src('src/scss/main.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'));
})

task ('styles2', function() {
    return src('src/scss/main.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'))
})

task ('watch', function() {
    return watch('src/scss/**/*.scss', parallel('styles'))
})