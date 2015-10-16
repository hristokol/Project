var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var gulp=require('gulp');
gulp.task('pre-test', function () {
    return gulp.src(['app.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});