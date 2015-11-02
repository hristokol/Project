'use strict'
var ImageResizerClass = require('./ImageResizerClass');
var imageResizer = new ImageResizerClass();

process.on('message', function (pathToImage, pathToSaveImage, dimensions) {
    var stream = imageResizer.resizeImage(pathToImage, pathToSaveImage, dimensions);
    stream.on('end', function () {
        process.send('done');
        process.exit();
    });
    stream.on('error', function () {
        process.send('error');
        process.exit(1);
    });
});
module.exports = {};