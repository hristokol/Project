///<reference path='../node.d.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict'
var multer = require('multer');
var uuid = require('node-uuid');
import FormValidator=require('../ValidatorClasses/FormValidator');
class RegisterFormUploadController {
    private uploadForm:any;
    private formValidator:FormValidator;

    constructor() {
        this.uploadForm = this.multerUploadObject().single('avatar');
        this.formValidator = new FormValidator();
    }

    public upload(request, response):void {
        this.uploadForm(request, response, function (error) {
            if (error) {
                response.json('Error uploading form');
                //To-Do: error codes
            } else if (this.formValidator.formValid(request.body)) {
                this.formCases(request)
            } else {
                response.json('Form is not valid');
            }
        });
    }

    private formCases(request, response) {
        if (request.file) {
            //resize in child process and then call RegisterController register() method
        } else {
            //continue uploading form with default avatar
            // req.file = 'url to avatar';
            //To-Do:call RegisterController register() method
        }
    }

    private multerStorage():any {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + uuid.v4() + '.' + file.mimetype.split('/')[1]);
            }
        });
    }

    private multerLimits():any {
        return {fileSize: Math.pow(20, 6), files: 1, fields: 6};
    }

    private multerFileFilter(request, file, callback):any {
        if (file && file.mimeType.indexOf('image') > -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Error'));
        }
    }

    private multerUploadObject():any {
        return multer({fileFilter: this.multerFileFilter, limits: this.multerLimits(), storage: this.multerStorage()});
    }
}
export=RegisterFormUploadController;