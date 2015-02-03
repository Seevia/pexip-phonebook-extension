'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var livereload = require('gulp-livereload');


function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  
  b = watchify(b);
  
  b.on('update', function(){
    bundleShare(b);
  });
  
  b.add('./src/main.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add transformation tasks to the pipeline here.
     .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'))
    .pipe(livereload());
}

gulp.task('default', function(){
  browserifyShare();
  livereload.listen();
});