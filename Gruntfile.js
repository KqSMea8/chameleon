
module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        filerev:{
            payment: {
                files: [{
                    src: ["./build/js/*","./build/css/*"],
                }]
            }
        },
        //压缩css
        cssmin: { 
          payment: {
            "files": {
              'build/css/index.css': ['./css/*.css']//将数组里面的css文件压缩成一个目标文件
            }
          }
        },
        //压缩js文件
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                mangle: true,
                compress: {
                    drop_console: true
                }
            },
            payment: {
                files: [{
                    expand: true,
                    cwd: "./js",
                    src: "*.js",
                    dest: "build/js",
                    ext: ".js"
                }]
            }
        },
         //watch自动化
        watch:{
            build:{
                files:['./js/*.js','./css/*.css'],
                tasks:['cssmin','uglify'],
                options:{spawn:false}
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-filerev");
    // grunt.loadNpmTasks("ggrunt-usemin");

    grunt.registerTask("default",["cssmin","uglify","filerev","watch"]);
};
