module.exports = function (grunt) {
    'use strict';
    var srcDir = 'assets/',
        destDir = 'build/';
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        concat : {
            options : {
                separator : ';'
            },
            prod : {
                src : [
                    srcDir + 'js/vendors/jquery.2.1.0.min.js',
                    srcDir + 'js/vendors/modernizr.js',
                    srcDir + 'js/vendors/sortable.js',
                    srcDir + 'js/vendors/fit-text.js',
                    srcDir + 'js/draw-lines.js',
                    srcDir + 'js/odl-script.js',
                    srcDir + 'js/main.js'
                ],
                dest : destDir + 'js/production.js'
            }
        },
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            prod : {
                src : '<%= concat.prod.dest %>',
                dest : destDir + 'js/production.min.js'
            }
        },
        sass : {
            dev : {
                options : {
                    style : 'expanded'
                },
                files : {
                    'assets/css/master.css' : 'assets/scss/master.scss',
                    'assets/css/noscript.css' : 'assets/scss/noscript.scss',
                    'assets/css/ie_fixes.css' : 'assets/scss/ie_fixes.scss'
                }
            },
            prod : {
                options : {
                    style : 'compressed'
                },
                files : {
                    'build/css/master.css' : 'assets/scss/master.scss',
                    'build/css/noscript.css' : 'assets/scss/noscript.scss',
                    'build/css/ie_fixes.css' : 'assets/scss/ie_fixes.scss'
                }
            }
        },
        imagemin : {
            options : {
                optimizationLevel : 7
            },
            dynamic : {
                files : [{
                    expand : true,
                    cwd : 'assets/img/',
                    src : ['**/*.{svg,png,jpg}'],
                    dest : 'build/img/'
                }]
            }
        },
        targethtml : {
            prod : {
                files : {
                    'build/index.html' : 'assets/index.html'
                }
            }
        },
        watch : {
            options : {
                livereload : true,
            },
            scripts : {
                files : ['assets/js/**/*.js'],
                tasks : ['concat', 'uglify'],
                options : {
                    spawn : false
                }
            },
            css : {
                files : ['assets/scss/**/*.scss'],
                tasks : ['sass:dev'],
                options : {
                    spawn : false
                }
            }
        },
        clean : {
            build : {
                src : ['build']
            }
        }
    });
    
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-contrib-sass');
//    grunt.loadNpmTasks('grunt-contrib-imagemin');
//    grunt.loadNpmTasks('grunt-newer');
//    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('prod', ['clean', 'targethtml', 'sass:prod' , 'concat', 'uglify', 'imagemin']);
    grunt.registerTask('default', ['watch']);
    
};

