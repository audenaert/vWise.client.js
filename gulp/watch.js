var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.start('docs:auto');
  gulp.start('test:auto');
});
