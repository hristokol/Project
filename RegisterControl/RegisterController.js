///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
///<reference path='../SendEmailControl/EmailSendController.ts'/>
'use strict';
var RegisterModel = require('./RegisterModel');
var FormValidator = require('../ValidatorClasses/FormValidator');
var EmailSendController = require('../SendEmailControl/EmailSendController');
var emailExistenceChecker = require('email-existence');
var self;
var RegisterController = (function () {
    function RegisterController() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
        this.emailSender = new EmailSendController();
        self = this;
    }
    RegisterController.prototype.register = function (formData, response) {
        //To-Do:password should be secured and redundant fields should be deleted
        if (this.validator.formValid(formData)) {
            this.checkEmailExistence(formData, response);
        }
        else {
            response.json({ error: 'Form invalid' });
        }
    };
    RegisterController.prototype.checkEmailExistence = function (formData, response) {
        var self = this;
        emailExistenceChecker.check(formData.email, function (error, emailCheckResponse) {
            if (emailCheckResponse) {
                //gmail's email checks work, abv's - don't
                console.log('Email exists.');
                self.model.register(formData, response, self.registerHandler);
            }
            else {
                response.json({ error: 'Email does not exist.' });
            }
        });
    };
    RegisterController.prototype.registerHandler = function (status, response) {
        if (status.error) {
            response.json({ error: status.error });
        }
        if (status.success) {
            self.sendEmail(status.email, status.name);
            response.json({ success: status.success });
        }
    };
    RegisterController.prototype.sendEmail = function (email, name) {
        this.emailSender.sendGreetingEmail(email, name);
    };
    return RegisterController;
})();
module.exports = RegisterController;
//# sourceMappingURL=RegisterController.js.map