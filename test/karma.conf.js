module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/js/app.js',
      'app/js/**/*.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/unit/**/*.js'
    ],

    exclude: [
      'app/js/bundled.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'browserify'],

    browsers : ['Chrome'], 

    preprocessors: {
      'app/js/app.js': ['browserify'],
    },

    plugins : [
      'karma-chrome-launcher',
      'karma-browserify',
      'karma-jasmine'
    ]

  });
};
