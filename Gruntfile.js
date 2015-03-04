module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-angular-templates');


  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'meta': {
      'jsFilesForTesting': [
        'dist/js/bower-<%= pkg.version %>.js',
        'test/**/*Spec.js'
      ]
    },

    'karma': {
      'development': {
        'configFile': 'karma.conf.js',
        'options': {
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'src/**/*.js'
          ],
        }
      },
      'dist': {
        'options': {
          'configFile': 'karma.conf.js',
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'dist/js/<%= pkg.namelower %>-<%= pkg.version %>.js'
          ],
        }
      },
      'minified': {
        'options': {
          'configFile': 'karma.conf.js',
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'dist/js/<%= pkg.namelower %>-<%= pkg.version %>.min.js'
          ],
        }
      }
    },

    'jshint': {
      'beforeconcat': ['src/**/*.js'],
    },

    'concat': {
      'dist': {
        'src': ['src/**/*.js'],
        'dest': 'dist/js/<%= pkg.namelower %>-<%= pkg.version %>.js'
      }
    },
    'sass': {
        'dist':{
            'files':[{
                'src':['src/**/*.scss'],
                'dest':'dist/css/style-<%= pkg.version %>.css',
            }]
        }
    },

    'bower_concat': {
        'all': {
            'dest': 'dist/js/bower-<%= pkg.version %>.js',
            'cssDest':'dist/css/bower-<%= pkg.version %>.css',
            'include': [
            ],
            'mainFiles': {

            },
            'dependencies': {
                'angular-ui-router': 'angular'
            },
            'exclude': {

            }
        }

    },

    'ngtemplates': {
        'app': {
            'cwd' : 'src',
            'src': ['**/*.tpl.html'],
            'dest': 'dist/templates/templates-<%= pkg.version %>.js',
            htmlmin: {
              collapseBooleanAttributes:      true,
              collapseWhitespace:             true,
              removeAttributeQuotes:          true,
              removeComments:                 true, // Only if you don't use comment directives! 
              removeEmptyAttributes:          true,
              removeRedundantAttributes:      true,
              removeScriptTypeAttributes:     true,
              removeStyleLinkTypeAttributes:  true
            }
          }

    },
    

    'uglify': {
      'options': {
        'mangle': false
      },  

      'dist': {
        'files': {
          'dist/js/<%= pkg.namelower %>-<%= pkg.version %>.min.js': ['dist/js/<%= pkg.namelower %>-<%= pkg.version %>.js'],
          'dist/js/bower-<%= pkg.version %>.min.js': ['dist/js/bower-<%= pkg.version %>.js'],
          'dist/templates/templates-<%= pkg.version %>.min.js': ['dist/templates/templates-<%= pkg.version %>.js'],
        }    
      }
    },
    'jsdoc': {
      'src': ['src/**/*.js'],
      'options': {
        'destination': 'doc'
      }
    },

    'copy': {
        'main': {
            'files': [
                {'nonull':'True', 'src': 'src/index.html', 'dest': 'dist/index.html'},
            ]
        }
    },

    

  });

  grunt.registerTask('test', ['karma:development']);
  grunt.registerTask('build',
    [
      'jshint',
      'bower_concat',
      'ngtemplates',
      'copy',
      'sass',
      'karma:development',
      'concat',
      'karma:dist',
      'uglify',
      'karma:minified',
      'jsdoc',
    ]);

};
