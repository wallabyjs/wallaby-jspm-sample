# wallaby-jspm-sample
This repository demonstrates how to use [wallaby.js](http://wallabyjs.com/) with [jspm](http://jspm.io/). Please note, that because SystemJs evals loaded code and [PhantomJs doesn't support sourceURL](https://github.com/ariya/phantomjs/issues/11477), **wallaby.js doesn't display inline error messages and expectation failures in this sample**. The messages are still displayed in the tool window console and inside 'Show line test(s)' action window.

To get inline messages working, you need to [configure Babel preprocessor/compiler to compile to System.js or AMD format and use `scriptLoad: true`](http://wallabyjs.com/docs/integration/systemjs.html).

## Install dependencies
```sh
npm install
jspm install
```
## Wallaby.js configuration
```javascript
module.exports = function () {

  // Preprocessor to transpile imports/exports and possibly other ES6 elements
  var babelPreprocessor = file => require('babel')
                                    .transform(file.content, {sourceMap: true});

  return {
    files: [
      // system.js and configuration
      {pattern: 'jspm_packages/system.js', instrument: false},
      {pattern: 'config.js', instrument: false},

      // source files (`load: false` as the files will be loaded by system.js loader)
      {pattern: 'src/*.js', load: false}
    ],
    tests: [
      // test files (`load: false` as we will load tests manually)
      {pattern: 'test/*Spec.js', load: false}
    ],

    preprocessors: {
      'test/*.js': babelPreprocessor,
      'src/*.js': babelPreprocessor
    },

    // telling wallaby to serve jspm_packages project folder
    // as is from wallaby web server
    middleware: (app, express) => {
      app.use('/jspm_packages',
              express.static(
                 require('path').join(__dirname, 'jspm_packages')));
    },

    bootstrap: function (wallaby) {
      // Preventing wallaby from starting the test run
      wallaby.delayStart();

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        // loading wallaby tests
        promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
      }

      // starting wallaby test run when everything require is loaded
      Promise.all(promises).then(function () {
        wallaby.start();
      });
    }
  };
};
```
