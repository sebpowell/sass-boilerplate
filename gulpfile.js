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
	fileinclude = require('gulp-file-include'),
	coffee = require('gulp-coffee');

// gulp.task('coffee', function() {
//   gulp.src('./src/*.coffee')
//     .pipe(coffee({bare: true}).on('error', gutil.log))
//     .pipe(gulp.dest('./public/'))
// });


// Browser Sync Config
// gulp.task('browser-sync', function() {
//     browserSync({
//         proxy: "localhost:3000",
//         port: 3002
//     });
// });


gulp.task('sass', function () {

	return sass('clickmechanic/clickmechanic.sass', { style: 'compact' })	    
	    // .pipe(gulp.dest('clickmechanic'))
	    // // .pipe(rename({suffix: '.min'}))
	    // // .pipe(minifycss())
	    // // .pipe(gulp.dest('clickmechanic'));
});
        



gulp.task('clickmechanic', function () {
	// return sass('clickmechanic/clickmechanic.sass', { style: 'compact' })
	// .on('error', function (err) {
	// 	console.error('Error!', err.message);
	// })
	// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	// .pipe(gulp.dest('clickmechanic/'));
	

	// gulp.src(['clickmechanic/views/*.html'])
 //    .pipe(fileinclude())
 //    .pipe(gulp.dest('clickmechanic/views/'))
 //    .pipe( notify({ message: "fileInclude tasks have been completed!"}) );
});

gulp.task('course', function () {
	// return sass('course/course.scss', { style: 'compact' })
	// .on('error', function (err) {
	// 	console.error('Error!', err.message);
	// })
	// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	// .pipe(gulp.dest('course/'));
});

gulp.task('sass-docs', function () {

	return sass('docs/docs.scss', { style: 'compact' })
	.on('error', function (err) {
		console.error('Error!', err.message);
	})
	// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(gulp.dest('docs/'));
	
});

gulp.task('sass-build', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('docs/views/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('docs/'))
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
	gulp.watch(['course/**/*'], ['course'])
	gulp.watch(['docs/**/*'], ['sass-docs', 'sass-build'])
	gulp.watch("sass/**/*.*", ['clickmechanic', 'course', 'sass-docs'])
	gulp.watch(['clickmechanic/views/*.html'], ['fileinclude'])
	gulp.watch(['clickmechanic/**/*'], ['clickmechanic'])
});

gulp.task("default", function() {
	
});