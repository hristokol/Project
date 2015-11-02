var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var gulp = require('gulp');
gulp.task('pre-test', function () {
    return gulp.src(['app.js', 'routes/router.js'])
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports('test/coverage'))
        .pipe(istanbul.enforceThresholds({thresholds: {global: 80}}));
});

gulp.task('avatar', function () {
    return gulp.src('./UploadedImages').
        pipe(gulpImageMin()).
        pipe(gulpImageResize({height: 850, width: 850, crop: true, upscale: false,format:'jpeg'})).
        pipe(gulp.dest('./Avatars/big')).
        pipe(gulpImageMin()).
        pipe(gulpImageResize({height: 100, width: 100, crop: true, upscale: true,format:'jpeg'})).
        pipe(gulp.dest('./Avatars/medium')).
        pipe(gulpImageMin()).
        pipe(gulpImageResize({height: 35, width: 35, crop: true, upscale: true,format:'jpeg'})).
        pipe(gulp.dest('./Avatars/small'));
});

gulp.task('wallPhoto', function () {
    return gulp.src('./UploadedImages').
        pipe(gulpImageMin()).
        pipe(gulpImageResize({height: 280, width: 850, crop: true, upscale: true,format:'jpeg'})).
        pipe(gulp.dest('./WallPhotos'));
});

gulp.task('photos', function () {
    return gulp.src('./UploadedImages').
        pipe(gulpImageMin()).
        pipe(gulpImageResize({height: 850, width: 850, crop: true, upscale: true,format:'jpeg'})).
        pipe(gulp.dest('./Photos'));
});

gulp.task('watch', function () {
    gulp.watch('UploadedImages/*avatar*', ['avatar']);
    gulp.watch('UploadedImages/*wallPhoto*', ['wallPhoto']);
    gulp.watch('UploadedImages/*photos*', ['photos']);
});

gulp.task('default', ['avatar', 'wallPhoto','photos', 'watch']);