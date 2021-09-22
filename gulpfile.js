const gulp = require('gulp');
const { src, dest, task, series, watch, parallel} = require("gulp")
const sass = require('gulp-sass')(require('sass'));
const autoPref = require('gulp-autoprefixer')
const sourceMaps =  require ('gulp-sourcemaps')

task ('styles', function() {
    return src('src/scss/main.scss')
    // .pipe(sourceMaps.init())
    .pipe(sass({

    }).on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(dest('dist'));
})

task ('watch', function() {
    return watch('src/scss/main.scss', parallel('styles'))
})