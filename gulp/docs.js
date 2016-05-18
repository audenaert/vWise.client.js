var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('docs', function () {
  return gulp.src([
    'README.md',
    path.join(conf.paths.src, '/**/*.js')
  ], { read: false })
    .pipe($.jsdoc3(conf.jsdoc));
});

gulp.task('docs:auto', ['scripts'], function () {
  gulp.watch([path.join(conf.paths.src, '**/*.js')], ['docs']);
});
