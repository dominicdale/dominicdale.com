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
var iconfont = require('gulp-iconfont');
var webp = require('gulp-webp');
var runTimestamp = Math.round(Date.now()/1000);
var inline = require('gulp-inline')

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
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(less().on('error', gutil.log))
});



// autoprefix
gulp.task('autoprefix', function() {
    gulp.src('./style.css')
      .pipe(autoprefixer({
          browsers: ['Firefox < 20', 'ie 8-11', 'iOS 7', 'last 2 Chrome versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./'))
});


// uglify
gulp.task('uglify', function () {
  gulp.src([
    './src/scripts/jquery.min.js',
    './src/scripts/scripts.js'
  ])
  .pipe(concat('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./'))
});


// browser reload
gulp.task('browserSync', function() {
  browserSync.init({
      proxy: 'dominicdale.local'
      // proxy: 'http://localhost:8888/dominicdale.com/'
  })
})

// html minify
gulp.task('minify', function() {
  return gulp.src('src/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});



// Gulp iconfont
gulp.task('iconFont', function(){
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'websiteIcons', // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available
      normalize: true,
      fontHeight: 1001,
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('./fonts/'));
});


// webP
gulp.task('webp', function () {
    return gulp.src('src/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('./img'));
});


// gulp inline
gulp.task('inline', ['minify'], function(){
  gulp.src('./index.html')
    .pipe(inline({
      base: './',
      js: uglify,
      css: [autoprefixer({ browsers:['last 2 versions'] })],
      disabledTypes: ['svg', 'img', 'js'], // Only inline css files 
    }))
    .pipe(gulp.dest('./'));
});


// html minify
gulp.task('minify', function() {
  return gulp.src('src/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});



// Watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/css/*.less', ['less']);
  // gulp.watch('./style.css', ['autoprefix']);
  // gulp.watch('./style.css', ['inline']);
  gulp.watch('./src/scripts/scripts.js', ['uglify']);
  gulp.watch('./src/views/*.html', ['inline']);
});


// Default task
gulp.task('default', ['less', 'uglify', 'inline', 'watch']);
