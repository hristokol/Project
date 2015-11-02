///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
///<reference path='../SendEmailControl/EmailSendController.ts'/>
'use strict'
import RegisterModel=require('./RegisterModel');
import FormValidator=require('../ValidatorClasses/FormValidator');
import EmailSendController=require('../SendEmailControl/EmailSendController');
var emailExistenceChecker = require('email-existence');
var self;
class RegisterController {
    private model;
    private validator;
    private emailSender;

    constructor() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
        this.emailSender = new EmailSendController();
        self=this;
    }

    public register(formData:any, response:any):void {
        //To-Do:password should be secured and redundant fields should be deleted
        if (this.validator.formValid(formData)) {
            this.checkEmailExistence(formData, response);
        } else {
            response.json({error: 'Form invalid'});
        }
    }

    private checkEmailExistence(formData:any, response:any):void {
        var self = this;
        emailExistenceChecker.check(formData.email, function (error, emailCheckResponse) {
            if (emailCheckResponse) {
                //gmail's email checks work, abv's - don't
                console.log('Email exists.');
                self.model.register(formData, response, self.registerHandler);
            } else {
                response.json({error: 'Email does not exist.'});
            }
        });
    }

    private registerHandler(status:any, response:any):void {
        if (status.error) {
            response.json({error: status.error});
        }
        if (status.success) {
            self.sendEmail(status.email,status.name);
            response.json({success: status.success});
        }
    }

    private sendEmail(email:string,name:string):void {
        this.emailSender.sendGreetingEmail(email,name);
    }
}
export=RegisterController;