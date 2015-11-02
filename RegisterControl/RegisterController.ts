///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict'
import RegisterModel=require('./RegisterModel');
import FormValidator=require('../ValidatorClasses/FormValidator');
var emailExistenceChecker = require('email-existence');
class RegisterController {
    private model;
    private validator;

    constructor() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
    }

    public register(formData:any, response:any):void {
        //To-Do:password should be secured and redundant fields should be deleted
        if (this.validator.formValid(formData)) {
            this.checkEmailExistence(formData, response);
        } else {
            response.json({error: 'Form invalid'});
        }
    }

    private checkEmailExistence(formData:any, response:any) :void{
        var self = this;
        emailExistenceChecker.check(formData.email, function (error, emailCheckResponse) {
            if (emailCheckResponse) {
                //gmail emails checks work, abv - no
                self.model.register(formData, response, self.registerHandler);
            } else {
                response.json({error: 'Email does not exist'});
            }
        });
    }

    private registerHandler(status:any, response:any):void {
        if (status.error) {
            response.json({error: status.error});
        }
        if (status.success) {
            response.json({success: status.success});
        }
    }
}
export=RegisterController;