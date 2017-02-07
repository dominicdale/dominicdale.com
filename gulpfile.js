var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var smoosher = require('gulp-smoosher');

var autoprefixerOptions = {
  browsers: ['Firefox < 20', 'ie 8-11', 'iOS 7', 'last 2 Chrome versions']
};


// less compiler
gulp.task('less', function () {
  return gulp.src('./src/css/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      compress: true
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(less().on('error', gutil.log))
});



// autoprefix

gulp.task('autoprefix', function() {
    gulp.src('./dist/style.css')
      .pipe(autoprefixer({
          browsers: ['Firefox < 20', 'ie 8-11', 'iOS 7', 'last 2 Chrome versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./dist/'))
});


// uglify
gulp.task('uglify', function () {
  gulp.src([
    './Scripts/jquery.js'
  ])
  .pipe(concat('compiled.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./Scripts'))
});


// browser reload

gulp.task('browserSync', function() {
  browserSync.init({
      proxy: 'dominicdale.local/dist'
  })
})

// html minify
gulp.task('minify', function() {
  return gulp.src('src/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});


// gulp smoosher
gulp.task('smoosh', function () {
    gulp.src('/dist/index.html')
        .pipe(smoosher())
        .pipe(gulp.dest('dist/'));
});

// Watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/css/*.less', ['less']);
  gulp.watch('./dist/style.css', ['autoprefix']);
  gulp.watch('./Scripts/scripts.js', ['uglify']);
  gulp.watch('./src/views/index.html', ['minify']);
  gulp.watch('./dist/index.html', ['smoosh']);
});


// Default task
gulp.task('default', ['less', 'uglify']);
