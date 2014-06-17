'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically from package.json
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'Gruntfile.js',
                'src/*.js',
                'test/spec/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        dest:'dist/',
                        src: 'src/*.js'
                    }
                ]
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                //pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        //Test settings
        karma: {
            unit: {
                configFile: 'test/config/karma-unit.conf.js',
                singleRun: true
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['karma','uglify:dist','copy:dist']);

};