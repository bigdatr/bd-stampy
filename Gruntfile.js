'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jsdoc : {
            dist : {
                src: '{components,constants,development,mixins,utils}/*.{js,jsx}', 
                options: {
                    destination: 'docs',
                    template : "templates/default",
                    configure : "jsdoc_conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('docs', ['jsdoc']);

};



