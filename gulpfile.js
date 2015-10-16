var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var gulp = require('gulp');
gulp.task('pre-test', function () {
    return gulp.src(['app.js','routes/router.js'])
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports('test/coverage'))
        .pipe(istanbul.enforceThresholds({thresholds: {global: 80}}));
});

