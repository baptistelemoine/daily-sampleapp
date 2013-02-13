/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Project configuration.
  grunt.initConfig({
    requirejs: {
      production: {
        options: {
          baseUrl: "public/js/",
          mainConfigFile: "public/js/main.js",
          out: "public/dist/dailystream-min.js",
          name:'main'
        }
      }
    }
  });

  //grunt.registerTask('default', 'requirejs');

};
