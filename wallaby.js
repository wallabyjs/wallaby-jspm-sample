module.exports = function (wallaby) {

  return {
    files: [
      {pattern: 'jspm_packages/system.js', instrument: false},
      {pattern: 'config.js', instrument: false},

      {pattern: 'src/**/*.js', load: false}
    ],
    tests: [
      {pattern: 'test/**/*Spec.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015']
      })
    },

    env: {
      kind: 'electron'
    },

    middleware: (app, express) => {
      app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
    },

    setup: function (wallaby) {
      wallaby.delayStart();

      System.config({
        transpiler: 'none'
      });

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i]));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      }).catch(function (e) {
        setTimeout(function () {
          throw e;
        }, 0);
      });
    }
  };
};
