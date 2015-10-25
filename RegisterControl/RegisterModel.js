///<reference path='../node.d.ts'/>
///<reference path='../DBConnectionSingleton.ts'/>
'use strict';
var DBConnection = require('../DBConnectionSingleton');
var RegisterModel = (function () {
    function RegisterModel() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }
    RegisterModel.prototype.register = function (formData, response, next) {
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
                next({ success: 'Successfull registration' }, response);
            }
            else if (error && error.code == 13) {
                next({ error: 'User with that email already exists' }, response);
            }
            else {
                next({ error: 'Register error' }, response);
            }
        });
    };
    return RegisterModel;
})();
module.exports = RegisterModel;
//# sourceMappingURL=RegisterModel.js.map