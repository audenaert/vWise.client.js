var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'webpack-stream']
});

/**
 * runs webpack to compile ES6 module files into a single js file
 *
 * @param  {boolean}  watch
 * @param  {boolean}  test
 * @param  {Function} done
 * @return {Stream}
 */
function webpackWrapper(watch, test, done) {
  var options = {
    watch: watch,
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015'
        }
      ]
    },
    output: {
      filename: conf.output.filename,
      library: conf.output.library,
      libraryTarget: 'umd',
      sourceMapFilename: conf.output.filename + '.map'

      // uncomment to name the AMD module definition instead of an anonymous define()
      // I'm not sure what best practice is
      // umdNamedDefine: true
    },
    externals: conf.dependencies,
    devtool: '#cheap-source-map'
  };

  var sources = [
    path.join(conf.paths.src, conf.mainFile)
  ];

  if (test) {
    sources.push(path.join(conf.paths.src, '/**/*.spec.js'));
  }

  return gulp.src(sources)
    .pipe($.webpackStream(options, null, changeHandler))
    .pipe(gulp.dest(conf.paths.dist));

  function changeHandler(err, stats) {
    if (err) {
      conf.errorHandler('webpack')(err);
    }

    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));

    if (watch) {
      watch = false;
      done();
    }
  }
}

gulp.task('flow', function () {
  return gulp.src(path.join(conf.paths.src, '**/*.js'))
    .pipe($.flowtype());
});

gulp.task('scripts', ['flow'], function () {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', function (done) {
  return webpackWrapper(true, false, done);
});

// Test scripts are built ad-hoc by karma for better coverage reports
// gulp.task('scripts:test', function () {
//   return webpackWrapper(false, true);
// });
//
// gulp.task('scripts:test-watch', function (done) {
//   return webpackWrapper(true, true, done);
// })
