module.exports = function(config) {
	config.set({
		basePath: '../',

		frameworks: ['jasmine'],

		files: [
			'../lib/jquery/jquery-2.1.1.js',
			'../src/**/*.js',
            'lib/**/*.js',
            'spec/**/*.js'
		],

        exclude: [
            'lib/jasmine-*/*.js'
        ],

		autoWatch: true,

		browsers: ['PhantomJS'],

		// coverage reporter generates the coverage
		reporters: [
            'progress'
//            'junit',
//            'coverage'
        ],

//		junitReporter: {
//			outputFile: 'test_out/unit.xml',
//			suite: 'unit'
//		},

//		preprocessors: {
//			// source files, that you wanna generate coverage for
//			// do not include tests or libraries
//			// (these files will be instrumented by Istanbul)
//			'app/js/**/*.js': ['coverage']
//		},

		// optionally, configure the reporter
//		coverageReporter: {
//			type: 'html',
//			dir: 'coverage/'
//		},

		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher'
//			'karma-chrome-launcher',
//			'karma-safari-launcher',
//			'karma-firefox-launcher',
//			'karma-junit-reporter',
//			'karma-coverage'
		]
	});
};