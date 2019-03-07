// Karma configuration
// Generated on 14 April 2018 12:44:59 GMT-0400 (EDT)
//command: node node_modules\karma\bin\karma start

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        // // 'web/js/mock/app-mock.js',
        'web/js/app.js',
        'web/js/app/app.http-provider.js',
        'web/js/app/app.route-main.js',
        'web/js/app/app.run.js',
         'web/js/controllers/**/*.js',
         'web/js/directives/**/*.js',
         'web/js/filters/**/*.js',
         'web/js/services/**/*.js',
         'web/js/mock/**/*.js',
          'web/test/*.js'
    ],


    // list of files to exclude
    exclude: [
        
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
