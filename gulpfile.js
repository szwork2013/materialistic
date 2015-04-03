var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');


gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./js/index.jsx'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher
  .on('update', function() {
    var updateStart = Date.now();
    console.log('updating');
    watcher.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
    console.log('updated', (Date.now() - updateStart) + 'ms');
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['browserify']);
