///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict';
var RegisterModel = require('./RegisterModel');
var FormValidator = require('../ValidatorClasses/FormValidator');
var RegisterController = (function () {
    function RegisterController() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
    }
    RegisterController.prototype.register = function (formData, response) {
        //To-Do:password should be secured and redundant fields should be deleted
        if (this.validator.formValid(formData)) {
            this.model.register(formData, response, this.registerHandler);
        }
        else {
            response.json({ error: 'Form invalid' });
        }
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