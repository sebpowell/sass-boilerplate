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
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:3000",
        port: 3002
    });
});

gulp.task("sass", function() {
	var onError = notify.onError({
		title:    'Your SASS is broken!',
		subtitle: '<%= file %> did not compile!',
		message:  '<%= error.message %>'   
	})
	gulp.src("public/css/include/*.sass")
		.pipe(sass({
			loadPath: process.cwd() + "public/css/include",
			style: "nested"
		}))
		.pipe(autoprefixer("last 2 version", "> 1%"))
		.pipe(gulp.dest("public/css"))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.reload({stream:true}));
		// .pipe(notify("SASS successfully compiled!"));
});

gulp.task("watch", function() {
	livereload.listen();
	gulp.watch("public/css/include/**/*.*", ["sass"])
	gulp.watch("public/js/include/**/*.js", ["uglify"]);
	gulp.watch("public/demo//**/*.jade", ["jade"]);
});
/*
 * Default Gulp task
 */
gulp.task("default", function() {
	gulp.start("watch");
	return gulp.src('app.js')
    .pipe(jsValidate());
});