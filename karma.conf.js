module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: ['mocha', 'expect'],

    // list of files / patterns to load in the browser
    files: [
      'tests/include/header.js',
      'tests/include/require-config.js',
      'dist/lib/yom-require/require.js',
      'tests/include/main.js',
      {pattern: 'dist/**/*.js', included: false},
      {pattern: 'tests/spec/**/*.js', included: false}
    ],

    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      'dist/examples/**/*.js': ['coverage']
    },

    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text-summary'}
      ]
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['mocha', 'coverage'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    autoWatchBatchDelay: 20000,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 200000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    plugins: [
      'karma-mocha',
      'karma-expect',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};
