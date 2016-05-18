var gulp = require('gulp');
var path = require('path');

var karma = require('karma');

/**
 * Launch and delegate test running to Karma server
 *
 * @param  {boolean}  isSingle
 * @param  {function} done
 */
function runTests (isSingle, done) {
  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: isSingle,
    autoWatch: !isSingle
  };

  var server = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error('failed ' + failCount + ' tests.') : null);
  });

  server.start();
}

gulp.task('test', /*['scripts:test'], */function (done) {
  runTests(true, done);
});

gulp.task('test:auto', /*['scripts:test-watch'], */function (done) {
  runTests(false, done);
});
