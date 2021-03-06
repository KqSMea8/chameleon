module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: { //清除目标文件下文件
      payment: {
        src: "payment/build"
      }
    },
    copy: {
      payment: {
        expand: true,
        cwd: 'payment/src',//源文件路径
        src: '**',//源文件目录下的所有文件
        dest: 'payment/build/',//目标文件路径，把源文件下的文件复制到该目录下
        flatten: false,//用来指定是否保持文件目录结构
        filter: 'isFile',
      },
    },
    uglify: {//压缩js文件
      payment: {
        files: [{
          expand: true,
          cwd: 'payment/src/js', //js源文件目录
          src: '*.js', //所有js文件
          dest: 'payment/build/js' //输出到此目录下
        }]
      }
    },
    cssmin: { //压缩css
      payment: {
        "files": {
          'payment/build/css/main.css': ['payment/src/css/*.css']//将数组里面的css文件压缩成一个目标文件
        }
      }
    },
    htmlmin: { //压缩html
      payment: {
        options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'payment/src', // Src matches are relative to this path.
          src: ['*.html'], // Actual pattern(s) to match.
          dest: 'payment/build/', // Destination path prefix.
          ext: '.html', // Dest filepaths will have this extension.
          extDot: 'first' // Extensions in filenames begin after the first dot
        }]
      }
    }
  });
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  grunt.registerTask('payment', ['clean:payment','copy:payment', 'uglify:payment', 'cssmin:payment', 'htmlmin:payment']);
}