///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict';
var RegisterModel = require('./RegisterModel');
var FormValidator = require('../ValidatorClasses/FormValidator');
var emailExistenceChecker = require('email-existence');
var RegisterController = (function () {
    function RegisterController() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
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
                //gmail emails checks work, abv - no
                self.model.register(formData, response, self.registerHandler);
            }
            else {
                response.json({ error: 'Email does not exist' });
            }
        });
    };
    RegisterController.prototype.registerHandler = function (status, response) {
        if (status.error) {
            response.json({ error: status.error });
        }
        if (status.success) {
            response.json({ success: status.success });
        }
    };
    return RegisterController;
})();
module.exports = RegisterController;
//# sourceMappingURL=RegisterController.js.map