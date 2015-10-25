///<reference path='RegisterModel.ts'/>
'use strict';
var RegisterModel = require('RegisterModel');
var RegisterController = (function () {
    function RegisterController() {
        this.model = new RegisterModel();
    }
    RegisterController.prototype.register = function (formData, response) {
        this.model.register(formData, response, this.registerHandler);
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