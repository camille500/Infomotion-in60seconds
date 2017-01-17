/* GULPFILE
------------------------------------------------------- */
'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');	// Concatonate files
const uglify = require('gulp-uglify');	// Minify files
const rename = require('gulp-rename');	// Rename files
const sass = require('gulp-sass');	// Sass compiler
const maps = require('gulp-sourcemaps');  // Create sourcemaps to map the original source
const connect = require('gulp-connect');
const open = require('gulp-open');

/* CONCAT ALL JS FILES
------------------------------------------------------- */
gulp.task('concatJS', function(){
	return gulp.src([
		  'public/js/components/*.js',
			'public/js/main.js'])
	.pipe(maps.init())
	.pipe(concat('scripts.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('public/dist/js'));
});

/* MINIFY ALL JS FILES
------------------------------------------------------- */
gulp.task('minifyJS', ['concatJS'], function(){
	return gulp.src("public/dist/js/scripts.js")
	.pipe(uglify())
	.pipe(rename('scripts.min.js'))
	.pipe(gulp.dest('public/dist/js'));
});

/* COMPILE SASS
------------------------------------------------------- */
gulp.task('compileSass', function(){
	return gulp.src('public/style/main.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('public/dist/style'))
});

/* OPEN IN BROWSER
------------------------------------------------------- */
gulp.task('openInBrowser', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:3000'}));
});

/* WATCH SASS
------------------------------------------------------- */
gulp.task('watchSass', function() {
	gulp.watch('public/style/**/*.scss', ['compileSass'])
});

/* BUILD TASK
------------------------------------------------------- */
gulp.task('build', ['minifyJS', 'compileSass']);

/* DEFAULT TASK
------------------------------------------------------- */
gulp.task('default', ['build']);
