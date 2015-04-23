// Load Gulp Dependencies
var gulp = require("gulp"),
	gutil = require('gulp-util'),
	sass = require("gulp-ruby-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	notify = require("gulp-notify"),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	filter  = require('gulp-filter'),
	browserSync = require('browser-sync'),
	jsValidate = require('gulp-jsvalidate'),
	nodemon = require('gulp-nodemon');
	cssGlobbing = require('gulp-css-globbing');

// Browser Sync Config
// gulp.task('browser-sync', function() {
//     browserSync({
//         proxy: "localhost:3000",
//         port: 3002
//     });
// });
gulp.task("watch", function() {
	gulp.watch("*/*/*.*", ["sass"])
});

gulp.task('sass', function() {
    return sass('dev.sass', { style: 'expanded' })
        .pipe(gulp.dest('css'));
});

gulp.task("default", function() {
	gulp.watch("*.sass", "*.scss", ["sass"])
});