///<reference path='../DBConnectionSingleton.ts'/>
'use strict';
var DBConnection = require('../DBConnectionSingleton');
var LoginModel = (function () {
    function LoginModel() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }
    LoginModel.prototype.checkDBForUser = function (session, credentials, response, next) {
        var self = this;
        self.couchbaseBucket.get('user::lookup::email::' + credentials.email, function (error, result) {
            if (!error && result) {
                self.getUserProfileFromDB(session, credentials, response, result.value.userID, next);
            }
            else if (error && error.code == 13) {
                next({ error: 'Wrong email or password' }, response);
            }
            else {
                next({ error: 'Something went wrong' }, response);
            }
        });
    };
    LoginModel.prototype.getUserProfileFromDB = function (session, credentials, response, userID, next) {
        var self = this;
        self.couchbaseBucket.get('user::id::' + userID, function (error, result) {
            if (!error && result) {
                next(result.value, response, session, credentials);
            }
            else if (error && error.code == 13) {
                next({ error: 'Wrong email or password' }, response);
            }
            else if (result && result.value.confirmed == false) {
                next({ error: 'Your profile awaits confirmation from the team leader you stated in your registration' }, response);
            }
            else {
                next({ error: 'Something went wrong' }, response);
            }
        });
    };
    return LoginModel;
})();
module.exports = LoginModel;
//# sourceMappingURL=LoginModel.js.map