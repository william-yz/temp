'use strict';


const gulp = require('gulp');
const runSequence = require('run-sequence');
const plugins = require('gulp-load-plugins')();
const config = require('./config/config');



gulp.task('eslint', function () {
  return gulp.src(['server.js', 'modules/**/*.js', 'src/js/*.js','src/main.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

gulp.task('watch', function() {
  gulp.watch('src/**/!(bondle).js', ['webpack']);
  gulp.watch(config.allTags, ['nodemon']);
});

gulp.task('nodemon', function() {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: 'modules/**/*'
  });
});


gulp.task('webpack', function() {
  return gulp.src('src/main.js')
    .pipe(plugins.webpack(require('./webpack.config')))
    .pipe(gulp.dest('src/'));
});

gulp.task('default', function (done) {
  runSequence('eslint', ['webpack', 'nodemon', 'watch'], done);
});
