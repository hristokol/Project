///<reference path='../node.d.ts'/>
'use strict'
var gulp = require('gulp');
var gulpImageMin = require('gulp-imagemin');
var gulpImageResize = require('gulp-image-resize');
class ImageResizerClass {
    constructor() {

    }

    public resizeImage(pathToImage:string, pathToSaveImage:string, dimensions:any):any {
        return gulp.src(pathToImage).
            pipe(gulpImageMin()).
            pipe(gulpImageResize({height: dimensions.height, width: dimensions.width, crop: true, upscale: true})).
            pipe(gulp.dest(pathToSaveImage));
    }
}
export =ImageResizerClass;