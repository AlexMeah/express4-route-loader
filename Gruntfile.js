module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('default', 'mochaTest');
};