///<reference path='../node.d.ts'/>
///<reference path='../DBConnectionSingleton.ts'/>
'use strict';
var uuid = require('node-uuid');
var DBConnection = require('../DBConnectionSingleton');
var RegisterModel = (function () {
    function RegisterModel() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }
    RegisterModel.prototype.register = function (formData, response, next) {
        var self = this;
        var userID = uuid.v4();
        this.couchbaseBucket.insert('user::lookup::email::' + formData.email, { userID: userID }, function (error) {
            if (!error) {
                self.insertRegistration(formData, userID, response, next);
            }
            else {
                next({ error: 'Register error' }, response);
            }
        });
    };
    RegisterModel.prototype.insertRegistration = function (formData, userID, response, next) {
        this.couchbaseBucket.insert('user::id::' + userID, formData, function (error) {
            if (!error) {
                next({
                    success: 'Successfull registration - redirect to login page in 3 seconds',
                    email: formData.email,
                    name: formData.name
                }, response);
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