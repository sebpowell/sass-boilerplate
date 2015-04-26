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
	jsValidate = require('gulp-jsvalidate'),
	nodemon = require('gulp-nodemon'),
	cssGlobbing = require('gulp-css-globbing'),
	extender = require('gulp-html-extend'),
	browserSync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include');

// Browser Sync Config
// gulp.task('browser-sync', function() {
//     browserSync({
//         proxy: "localhost:3000",
//         port: 3002
//     });
// });


gulp.task('sass', function () {
	// return sass('sass/base.sass')
	// .pipe(gulp.dest('sass'));
	
	return sass('clickmechanic/clickmechanic.sass')
	.pipe(gulp.dest('clickmechanic'));
});

gulp.task('clickmechanic', function () {
	return sass('clickmechanic/clickmechanic.sass')
	.on('error', function (err) {
	console.error('Error!', err.message);
	})
	.pipe(gulp.dest('clickmechanic/'));

	gulp.src(['clickmechanic/views/*.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('clickmechanic/views/'))
    .pipe( notify({ message: "fileInclude tasks have been completed!"}) );
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "test.dev"
    });
});

gulp.task('fileinclude', function() {
  gulp.src(['clickmechanic/views/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('clickmechanic/views/build'));
});

gulp.task("watch", function() {
	gulp.watch("sass/**/*.*", ["sass"])
	gulp.watch(['clickmechanic/views/*.html'], ['fileinclude'])
	gulp.watch(['clickmechanic/**/*'], ['clickmechanic'])
});

gulp.task("default", function() {
	
});