/*global module, require*/

var AUTOPREFIXER_BROWSERS = ['last 3 versions', 'ie >= 9'];

module.exports = function(grunt) {
    'use strict';

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json')
    };

    gruntConfig.jslint = {
        files: ['src/js/**/*.js', 'spec/*.js', 'Gruntfile.js'],
        directives: {
            browser: true,
            unparam: true,
            todo: true,
            debug: true
        }
    };

    gruntConfig.jasmine = {
        suite: {
            src: 'src/js/**/*.js',
            options: {
                specs: 'spec/*.spec.js',
                helpers: 'spec/helpers/*.js',
                styles: 'dist/css/*.css',
                junit: {
                    path: "reports/jasmine/",
                    consolidate: true
                },
                keepRunner: true,
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'reports/jasmine/coverage.json',
                    report: 'coverage'
                }
            }
        }
    };

    gruntConfig.uglify = {
        options: {
            report: 'gzip'
        },
        build: {
            src: 'src/js/medium-editor.js',
            dest: 'dist/js/<%= pkg.name %>.min.js'
        }
    };

    gruntConfig.csslint = {
        strict: {
            options: {
                'box-sizing': false,
                'import': 2,
                'compatible-vendor-prefixes': false,
                'gradients': false
            },
            src: 'dist/css/**/*.css'
        }
    };

    gruntConfig.sass = {
        dist: {
            options: {
                outputStyle: 'compressed',
                includePaths: ['src/sass/']
            },
            files: {
                'dist/css/medium-editor.css': 'src/sass/medium-editor.scss',
                'dist/css/themes/bootstrap.css': 'src/sass/themes/bootstrap.scss',
                'dist/css/themes/default.css': 'src/sass/themes/default.scss',
                'dist/css/themes/flat.css': 'src/sass/themes/flat.scss',
                'dist/css/themes/mani.css': 'src/sass/themes/mani.scss',
                'dist/css/themes/roman.css': 'src/sass/themes/roman.scss'
            }
        }
    };

    gruntConfig.autoprefixer = {
        single_file: {
            src: 'dist/css/medium-editor.css',
            browsers: AUTOPREFIXER_BROWSERS
        },
        multiple_files: {
            expand: true,
            flatten: true,
            src: 'dist/css/themes/*.css',
            dest: 'dist/css/themes/',
            browsers: AUTOPREFIXER_BROWSERS
        }
    };

    gruntConfig.watch = {
        scripts: {
            files: ['src/js/**/*.js', 'spec/*.js', 'Gruntfile.js'],
            tasks: ['js'],
            options: {
                debounceDelay: 250
            }
        },
        styles: {
            files: 'src/sass/**/*.scss',
            tasks: ['css'],
            options: {
                debounceDelay: 250
            }
        }
    };

    gruntConfig.concat = {
        options: {
            stripBanners: true
        },
        dist: {
            src: 'src/js/medium-editor.js',
            dest: 'dist/js/<%= pkg.name %>.js'
        }
    };

    gruntConfig.plato = {
        feed: {
            files: {
                'reports/plato': ['src/js/medium-editor.js']
            }
        }
    };

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('test', ['jslint', 'jasmine', 'csslint']);
    grunt.registerTask('js', ['jslint', 'jasmine', 'uglify', 'concat']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'csslint']);
    grunt.registerTask('default', ['js', 'css']);

};
