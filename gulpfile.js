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
var iconfont = require('gulp-iconfont');
var webp = require('gulp-webp');
var runTimestamp = Math.round(Date.now()/1000);

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
    './src/scripts/jquery.min.js',
    './src/scripts/scripts.js'
  ])
  .pipe(concat('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist'))
});


// browser reload
gulp.task('browserSync', function() {
  browserSync.init({
      //proxy: 'dominicdale.local/dist'
      proxy: 'http://localhost:8888/dominicdale.com/dist/'
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
    gulp.src('/dist/*.html')
        .pipe(smoosher())
        .pipe(gulp.dest('dist/'));
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
        // CSS templating, e.g.
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('dist/fonts/'));
});

// webP
gulp.task('webp', function () {
    return gulp.src('src/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
});



// Watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/css/*.less', ['less']);
  gulp.watch('./dist/style.css', ['autoprefix']);
  gulp.watch('./src/scripts/scripts.js', ['uglify']);
  gulp.watch('./src/views/*.html', ['minify']);
  gulp.watch('./dist/*.html', ['smoosh']);
});


// Default task
gulp.task('default', ['less', 'uglify']);
