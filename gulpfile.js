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
var runTimestamp = Math.round(Date.now()/1000);
var ngrok = require('ngrok');
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
    './src/scripts/scripts.js'
  ])
  .pipe(concat('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist'))
});



// browser reload
gulp.task('browserSync', function() {
  browserSync.init({
      server: {
        baseDir: "dist"
      }
  })
})




// html minify
gulp.task('minify', function() {
  return gulp.src('src/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});




// Gulp iconfont
gulp.task('iconFont', function(){
  return gulp.src(['src/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'websiteIcons',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      normalize: true,
      fontHeight: 1001,
      timestamp: runTimestamp,
    }))
      .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('dist/fonts/'));
});


// ngrok
gulp.task('ngrok-push', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});



// Watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./src/css/*.less', ['less']);
  gulp.watch('./dist/style.css', ['autoprefix']);
  gulp.watch('./src/scripts/scripts.js', ['uglify']);
  gulp.watch('./src/views/index.html', ['minify']);
});


// Ngrok
gulp.task('ngrok', ['browserSync', 'ngrok-push']);



// Build
gulp.task('build', ['less', 'autoprefix', 'uglify', 'minify', 'iconFont', 'browserSync']);
