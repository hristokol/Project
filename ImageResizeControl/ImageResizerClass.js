///<reference path='../node.d.ts'/>
'use strict';
var gulp = require('gulp');
var gulpImageMin = require('gulp-imagemin');
var gulpImageResize = require('gulp-image-resize');
var ImageResizerClass = (function () {
    function ImageResizerClass() {
    }
    ImageResizerClass.prototype.resizeImage = function (pathToImage, pathToSaveImage, dimensions) {
        return gulp.src(pathToImage).pipe(gulpImageMin()).pipe(gulpImageResize({ height: dimensions.height, width: dimensions.width, crop: true, upscale: true })).pipe(gulp.dest(pathToSaveImage));
    };
    return ImageResizerClass;
})();
module.exports = ImageResizerClass;
//# sourceMappingURL=ImageResizerClass.js.map