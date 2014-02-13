/*
 * Copyright (c) 2013 Gary Wang
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		outputBasePath: '<%=grunt.option("yomb-output-base-path") || ""%>',

		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			dist: {
				options: {
					open: true,
					base: 'dist',
					keepalive: true,
					livereload: false
				}
			}
		},

		jshint: {
			all: [
				'src/**/*.js',
				'src/**/*.js',
				'src/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		watch: {
			all: {
				files: [
					'src/**/*'
				],
				tasks: [
					'build-all'
				]
			},
			one: {
				files: [
					'src/examples/xxx/**/*.coffee',
					'src/examples/xxx/**/*.html',
					'src/examples/xxx/**/*.less'
				],
				tasks: [
					'build-one'
				]
			},
			options: {
				livereload: true
			}
		},

		karma: {
			test: {
				configFile: 'karma.conf.js',
				port: 9877,
				singleRun: true,
				browsers: ['PhantomJS']
			}
		},

		yomb: {
			options: {
				buildTpl: false,
				buildNodeTpl: false,
				allowSrcOutput: true,
				uglify: -1,
				cssmin: false,
				compressHtml: false,
				/*
				 -c, --charset <charset>       Charset for reading files, UTF-8 by default
				 --preserve-comments           Preserve comments
				 --preserve-multi-spaces       Preserve multiple spaces
				 --preserve-line-breaks        Preserve line breaks
				 --remove-intertag-spaces      Remove intertag spaces
				 --remove-quotes               Remove unneeded quotes
				 --simple-doctype              Change doctype to <!DOCTYPE html>
				 --remove-style-attr           Remove TYPE attribute from STYLE tags
				 --remove-link-attr            Remove TYPE attribute from LINK tags
				 --remove-script-attr          Remove TYPE and LANGUAGE from SCRIPT tags
				 --remove-form-attr            Remove METHOD="GET" from FORM tags
				 --remove-input-attr           Remove TYPE="TEXT" from INPUT tags
				 --simple-bool-attr            Remove values from boolean tag attributes
				 --remove-js-protocol          Remove "javascript:" from inline event handlers
				 --remove-http-protocol        Remove "http:" from tag attributes
				 --remove-https-protocol       Remove "https:" from tag attributes
				 --remove-surrounding-spaces <min|max|all|custom_list>
				*/
				compressHtmlOptions: '--remove-script-attr',
				outputBasePath: '<%=outputBasePath%>',
				protect: [],
				lang: {
					base: 'src/lang'
				},
				coffeeOptions: {
					bare: false,
					sourceMap: false,
					header: true
				},
				properties: {
				}
			},

			'coffee-all': {
				files: [
					{
						src: 'src',
						ignore: {
							'node_modules': 1
						}
					}
				]
			},

			'build-all': {
				files: [
					{
						src: 'src',
						dest: 'dist',
						ignore: {
							'examples/same-folder-output': 1
						}
					},
					{
						src: 'src/examples/same-folder-output',
						dest: 'src/examples/same-folder-output'
					}
				]
			},

			'concat-all': {
				files: [
					{
						src: ['src/lib/jquery/jquery-1.9.1.js'],
						dest: 'dist/lib/jquery/jquery-1.9.1.js',
						banner: '/*! jQuery v1.9.1 jquery.com | jquery.org/license */\n'
					}
				]
			},

			'copy-all': {
				files: [
					{
						src: 'src/lang',
						dest: 'dist/lang'
					},
					{
						src: 'src/lib/yom-require',
						dest: 'dist/lib/yom-require'
					},
					{
						src: 'src',
						dest: 'dist',
						includeRegexp: '(\\.jpg|\\.jpeg|\\.gif|\\.png|\\.ico|\\.otf|\\.eot|\\.svg|\\.ttf|\\.woff|-min\\.css)$',
						cssmin: false
					}
				]
			},

			'coffee-one': {
				files: [
					{
						src: 'src/examples/xxx'
					}
				]
			},

			'build-one': {
				files: [
					{
						src: 'src/examples/xxx',
						dest: 'dist/examples/xxx',
						ignore: {}
					}
				]
			},

			'concat-one': {
				files: [
				]
			},

			'copy-one': {
				files: [
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-yomb');

	//
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('build-all', ['yomb:coffee-all', 'yomb:build-all', 'yomb:concat-all', 'yomb:copy-all']);
	grunt.registerTask('build-one', ['yomb:coffee-one', 'yomb:build-one', 'yomb:concat-one', 'yomb:copy-one']);
	grunt.registerTask('test', ['build-all', 'karma']);
	grunt.registerTask('default', ['build-all']);
};
