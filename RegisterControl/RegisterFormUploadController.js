///<reference path='../node.d.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
///<reference path='RegisterController.ts'/>
'use strict';
var multer = require('multer');
var uuid = require('node-uuid');
var path = require('path');
var child = require('child_process');
var RegisterController = require('./RegisterController');
var self;
var RegisterFormUploadController = (function () {
    function RegisterFormUploadController() {
        this.uploadForm = this.multerUploadObject().single();
        this.registerController = new RegisterController();
        self = this;
    }
    RegisterFormUploadController.prototype.upload = function (request, response) {
        self.uploadForm(request, response, function (error) {
            if (error) {
                response.json({ error: 'Error uploading form' });
            }
            else {
                if (request.body) {
                    self.sendDataToController(request.body, response);
                }
                else {
                    console.log('Empty request sent');
                }
            }
        });
    };
    RegisterFormUploadController.prototype.sendDataToController = function (body, response) {
        var formData = {
            email: body.email,
            repeatEmail: body.reEmail,
            password: body.password,
            repeatPassword: body.rePassword,
            name: body.name,
            surname: body.surname,
            avatar: '../Avatars/defaultAvatar.jpeg',
            wallPhoto: '../WallPhotos/defaultWallPhoto.jpeg',
            position: body.position
        };
        this.registerController.register(formData, response);
    };
    RegisterFormUploadController.prototype.multerLimits = function () {
        //To-Do:determine field sizes and set limits on them
        return { files: 0, fields: 8 };
    };
    RegisterFormUploadController.prototype.multerUploadObject = function () {
        return multer({
            limits: this.multerLimits()
        });
    };
    RegisterFormUploadController.prototype.resizeInChildProcess = function (pathToImage, pathToSaveImage, dimensions) {
        var imageChildProcess = path.resolve(__dirname, './ImageResizerClass.js');
        var childProcess = child.fork(imageChildProcess);
        childProcess.on('error', function (error) {
            console.log(error);
        });
        childProcess.on('exit', function () {
            //resizing ended with no problems
            console.log('Image resize ended successfully');
        });
        childProcess.send(pathToImage, pathToSaveImage, dimensions);
    };
    RegisterFormUploadController.prototype.multerStorage = function () {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../UploadedImages');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + uuid.v4() + '.' + file.mimetype.split('/')[1]);
            }
        });
    };
    RegisterFormUploadController.prototype.multerFileFilter = function (request, file, callback) {
        if (file && file.mimeType.indexOf('image') > -1) {
            return callback(null, true);
        }
        else {
            return callback(new Error('Error'));
        }
    };
    return RegisterFormUploadController;
})();
module.exports = RegisterFormUploadController;
//# sourceMappingURL=RegisterFormUploadController.js.map