// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

gulp.task('lint-client', function () {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//build the app
gulp.task('browserify-client', ['lint-client'], function () {
    return gulp.src('./index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(rename('mathlib.js'))
        .pipe(gulp.dest('build')) //compile the JS and copy it to the build folder, where it will be minified, uglified, and copied to public to be served by the backend.
        .pipe(gulp.dest('dist/javascripts')); //compile to dist so we can serve it unminified in development
});

gulp.task('styles', function () {
    return gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(prefix({ cascade: true }))
        .pipe(rename('mathlib.css'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('minify', ['styles'], function () {
    return gulp.src('build/math.css')
        .pipe(minifyCSS())
        .pipe(rename('mathlib.min.css'))
        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('uglify', ['browserify-client'], function () {
    return gulp.src('build/math.js')
        .pipe(uglify())
        .pipe(rename('mathlib.min.js'))
        .pipe(gulp.dest('dist/javascripts'));
});

gulp.task('build', ['uglify', 'minify']);

//watch for any changes. This task rigger rebuilds of the app and test when one of the source files changes.
gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['browserify-client']);
    // gulp.watch('test/client/**/*.js', ['browserify-test']);
});

gulp.task('default', ['build', 'watch']);


// gulp.task('lint-test', function () {
//     return gulp.src('./test/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });


// //build the tests
// gulp.task('browserify-test', ['lint-test'], function () {
//     return gulp.src('test/client/index.js')
//         .pipe(browserify({
//             insertGlobals: true
//         }))
//         .pipe(rename('client-test.js'))
//         .pipe(gulp.dest('build'));
// });