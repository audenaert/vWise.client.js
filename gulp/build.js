var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license']
});

gulp.task('build', ['scripts'], function () {
  return gulp.src(path.join(conf.paths.dist, conf.output.filename))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('uglify'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(conf.paths.dist))
    .pipe($.size({
      title: path.join(conf.paths.dist, '/'),
      showFiles: true
    }));
});
