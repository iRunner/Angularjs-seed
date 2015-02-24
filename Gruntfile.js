module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');


  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'meta': {
      'jsFilesForTesting': [
        'bower_components/jquery/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/restangular/dist/restangular.js',
        'bower_components/underscore/underscore.js',
        'bower_components/underscore/underscore.js',
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

    'bower_concat': {
        'all': {
            'dest': 'dist/js/bower-<%= pkg.version %>.js',
            'mainFiles': {

            },
            'dependencies': {

            },
            'exclude': {

            },
            'include': {

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
          'dist/js/bower-<%= pkg.version %>.min.js': ['dist/js/bower-<%= pkg.version %>.js']
        }    
      }
    },
    'jsdoc': {
      'src': ['src/**/*.js'],
      'options': {
        'destination': 'doc'
      }
    }

    

  });

  grunt.registerTask('test', ['karma:development']);
  grunt.registerTask('build',
    [
      'jshint',
      'karma:development',
      'concat',
      'karma:dist',
      'uglify',
      'karma:minified',
      'jsdoc',
    ]);

};
