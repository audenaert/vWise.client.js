var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

gulp.task('clean', function () {
  return $.del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/'),
    path.join(conf.paths.docs, '/')
  ])
});
