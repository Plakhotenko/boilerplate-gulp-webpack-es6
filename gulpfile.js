/**
 * Created by jefvlamings on 14/05/15.
 */

// Requirements
var gulp                = require('gulp');
var gutil               = require("gulp-util");
var haml                = require('gulp-haml-coffee');
var sass                = require('gulp-sass');
var uglify              = require('gulp-uglify');
var notify              = require("gulp-notify");
var webpack             = require("gulp-webpack");
var webpackConfig       = require("./webpack.config.js");
var browserSync         = require('browser-sync').create();

// Paths
var paths = {
    scripts: ['src/js/*.js'],
    sass: ['src/css/*.sass'],
    haml: ['src/*.haml']
};

//Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

// HTML
gulp.task('haml', function () {
    gulp.src(paths.haml)
        .pipe(haml())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

// Javascript
gulp.task("javascript", function() {
    return gulp.src('src/js/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});

// Sass
gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['javascript']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.sass, ['sass']);
});

// Default task
gulp.task('default', ['watch', 'browser-sync', 'javascript', 'haml', 'sass']);
