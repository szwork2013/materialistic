var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');


// We create an array of dependencies. These are NPM modules you have
// installed in node_modules. Think: "require('react')" or "require('underscore')"
var dependencies = [
    'react', // react is part of this boilerplate
    'material-ui'
];

// Now this task both runs your workflow and deploys the code,
// so you will see "options.development" being used to differenciate
// what to do
var browserifyTask = function (options) {

  /* First we define our application bundler. This bundle is the
     files you create in the "app" folder */
    var appBundler = browserify({
        entries: [options.src], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: options.development, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    /* We set our dependencies as externals of our app bundler.
     For some reason it does not work to set these in the options above */
  appBundler.external(options.development ? dependencies : []);

  /* This is the actual rebundle process of our application bundle. It produces
    a "main.js" file in our "build" folder. */
  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload())) // It notifies livereload about a change if you use it
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  /* When we are developing we want to watch for changes and
    trigger a rebundle */
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  // And trigger the initial bundling
  rebundle();

  if (options.development) {


    /* And now we have to create our third bundle, which are our external dependencies,
      or vendors. This is React JS, underscore, jQuery etc. We only do this when developing
      as our deployed code will be one file with all application files and vendors */
    var vendorsBundler = browserify({
      debug: true, // It is nice to have sourcemapping when developing
      require: dependencies
    });

    /* We only run the vendor bundler once, as we do not care about changes here,
      as there are none */
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));

  }

}

// We also have a simple css task here that you can replace with
// SaSS, Less or whatever
// var cssTask = function (options) {
//     if (options.development) {
//       var run = function () {
//         gulp.src(options.src)
//           .pipe(concat('main.css'))
//           .pipe(gulp.dest(options.dest));
//       };
//       run();
//       gulp.watch(options.src, run);
//     } else {
//       gulp.src(options.src)
//         .pipe(concat('main.css'))
//         .pipe(cssmin())
//         .pipe(gulp.dest(options.dest));
//     }
// }

// Starts our development workflow
gulp.task('default', function () {

  browserifyTask({
    development: true,
    src: './js/index.jsx',
    dest: './build'
  });

  // cssTask({
  //   development: true,
  //   src: './styles/**/*.css',
  //   dest: './build'
  // });

});

// Deploys code to our "dist" folder
gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: './app/main.js',
    dest: './dist'
  });

  // cssTask({
  //   development: false,
  //   src: './styles/**/*.css',
  //   dest: './dist'
  // });

});

// Runs the test with phantomJS and produces XML files
// that can be used with f.ex. jenkins
// gulp.task('test', function () {
//     return gulp.src('./build/testrunner-phantomjs.html').pipe(jasminePhantomJs());
// });
