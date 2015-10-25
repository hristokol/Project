///<reference path='../DBConnectionSingleton.ts'/>
'use strict';
var DBConnection = require('../DBConnectionSingleton');
var LoginModel = (function () {
    function LoginModel() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }
    LoginModel.prototype.checkDBForUser = function (session, credentials, response, next) {
        var self = this;
        self.couchbaseBucket.get('user::email::' + credentials.email, function (error, result) {
            if (!error && result) {
                next(session, credentials, result.value, response);
            }
            else if (error && error.code == 13) {
                next({ error: 'Wrong email or password', response: response });
            }
        });
    };
    return LoginModel;
})();
module.exports = LoginModel;
//# sourceMappingURL=LoginModel.js.map