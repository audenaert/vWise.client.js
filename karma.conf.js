/* eslint-env node */

var path = require('path');
var conf = require('./gulp/conf');

var wiredep = require('wiredep');

function listFiles() {
  // pull in bower dependencies
  var wiredepOptions = {
    dependencies: true,
    devDependencies: true,
    directory: 'bower_components'
  };

  var vendors = wiredep(wiredepOptions).js || [];

  var patterns = vendors
    .concat([
      // add babel polyfill so we have access to Promises in PhantomJS
      'node_modules/babel-polyfill/dist/polyfill.js',
      path.join(conf.paths.test, 'index.js')
    ]);

  return patterns.map((pattern) => ({ pattern: pattern }));
}

module.exports = function (config) {
  var configuration = {
    files: listFiles(),
    singleRun: true,
    autoWatch: false,

    frameworks: [
      'phantomjs-shim',
      'mocha',
      'chai',
      'sinon'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-webpack'
    ],

    browsers: [
      'PhantomJS'
    ],

    reporters: [
      'progress',
      'coverage'
    ],

    proxies: {},

    preprocessors: {
      [path.join(conf.paths.test, 'index.js')]: 'webpack'
    },

    webpack: {
      babel: {
        presets: ['es2015']
      },
      isparta: {
        babel: {
          presets: ['es2015']
        }
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          {
            test: /\.js$/,
            exclude: [
              /test\/index\.js$/,
              /\.(spec|mock)\.js$/
            ],
            loader: 'isparta'
          }
        ]
      },
      externals: conf.dependencies
    }
  };

  config.set(configuration);
}
