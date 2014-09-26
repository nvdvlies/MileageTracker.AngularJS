// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');
var karma = require('gulp-karma');
var protractor = require("gulp-protractor").protractor;

// tasks

gulp.task('clean-src', function() {
  return gulp.src('./app/js/bundled.js', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', '!./app/js/bundled.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('browserify', function() {
  return gulp.src(['./app/js/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundled.js'))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['./app/js/*.js', './app/js/**/*.js', '!./app/js/bundled.js'],[
    'lint',
    'browserify'
  ]);
  gulp.watch(['./app/**/*.*'], ['reload']);
});

gulp.task('reload', function () {
    gulp.src(['./app/**/*.*'])
      .pipe(connect.reload());
});

gulp.task('clean-dist', function() {
  return gulp.src('./dist/', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('browserifyDist', function() {
  return gulp.src(['./app/js/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundled.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  return gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-bower-components', function () {
  return gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('./dist/bower_components/'));
});

gulp.task('copy-html-files', function () {
  return gulp.src(['./app/**/*.html', '!./app/bower_components/**'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});

gulp.task('karma-single', function() {
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: './test/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('karma', function() {
  gulp.src('./foobar')
    .pipe(karma({
      configFile: './test/karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('protractor', function() {
  gulp.src(["./test/e2e/**/*.js"])
    .pipe(protractor({
        configFile: "test/protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8888']
    })) 
    .on('error', function(e) { throw e })
});

gulp.task('default', function(callback) {
  runSequence('clean-src', 
              'lint',
              'browserify',
              'connect',
              'watch',
              callback);
});

gulp.task('build', function(callback) {
  runSequence('karma-single',
              'clean-dist', 
              'lint',
              'browserifyDist',
              'minify-css',
              'copy-html-files',
              'copy-bower-components',
              'connectDist',
              callback);
});

