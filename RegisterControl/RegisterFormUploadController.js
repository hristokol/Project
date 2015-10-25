///<reference path='../node.d.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict';
var multer = require('multer');
var uuid = require('node-uuid');
var FormValidator = require('../ValidatorClasses/FormValidator');
var RegisterFormUploadController = (function () {
    function RegisterFormUploadController() {
        this.uploadForm = this.multerUploadObject().single('avatar');
        this.formValidator = new FormValidator();
    }
    RegisterFormUploadController.prototype.upload = function (request, response) {
        this.uploadForm(request, response, function (error) {
            if (error) {
                response.json('Error uploading form');
            }
            else if (this.formValidator.formValid(request.body)) {
                this.formCases(request);
            }
            else {
                response.json('Form is not valid');
            }
        });
    };
    RegisterFormUploadController.prototype.formCases = function (request, response) {
        if (request.file) {
        }
        else {
        }
    };
    RegisterFormUploadController.prototype.multerStorage = function () {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + uuid.v4() + '.' + file.mimetype.split('/')[1]);
            }
        });
    };
    RegisterFormUploadController.prototype.multerLimits = function () {
        return { fileSize: Math.pow(20, 6), files: 1, fields: 6 };
    };
    RegisterFormUploadController.prototype.multerFileFilter = function (request, file, callback) {
        if (file && file.mimeType.indexOf('image') > -1) {
            return callback(null, true);
        }
        else {
            return callback(new Error('Error'));
        }
    };
    RegisterFormUploadController.prototype.multerUploadObject = function () {
        return multer({ fileFilter: this.multerFileFilter, limits: this.multerLimits(), storage: this.multerStorage() });
    };
    return RegisterFormUploadController;
})();
module.exports = RegisterFormUploadController;
//# sourceMappingURL=RegisterFormUploadController.js.map