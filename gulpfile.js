/* eslint-env node */

var gulp = require('gulp');
var fs = require('fs');

fs.readdirSync('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).forEach(function (file) {
  require('./gulp/' + file);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
  gulp.start('docs');
});
