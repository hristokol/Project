///<reference path='../node.d.ts'/>
///<reference path='../DBConnectionSingleton.ts'/>
'use strict';
var DBConnection = require('../DBConnectionSingleton');
var RegisterModel = (function () {
    function RegisterModel() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }
    RegisterModel.prototype.register = function (formData, response, next) {
        //To-Do: form validation
        var reg = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            surname: formData.surname,
            avatar: formData.avatar,
            position: formData.position
        };
        this.couchbaseBucket.insert('user::' + formData.email, reg, function (error) {
            if (!error) {
                next({ success: 'Successfull registration', response: response });
            }
            else {
                next({ error: 'Registration error', response: response });
            }
        });
    };
    return RegisterModel;
})();
module.exports = RegisterModel;
//# sourceMappingURL=RegisterModel.js.map