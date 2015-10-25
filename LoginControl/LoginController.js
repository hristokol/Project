///<reference path='../node.d.ts'/>
///<reference path='LoginModel.ts'/>
'use strict';
var jwt = require('jsonwebtoken');
var config = require('../routeConfig.js');
var LoginModel = require('./LoginModel');
var LoginController = (function () {
    function LoginController() {
        this.model = new LoginModel();
    }
    LoginController.prototype.isLogged = function (request, response, next) {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            next();
        }
        catch (exception) {
            response.redirect('/signin');
        }
    };
    LoginController.prototype.loggedState = function (request, response, next) {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            response.redirect('/');
        }
        catch (exception) {
            next();
        }
    };
    LoginController.prototype.login = function (session, credentials, response) {
        this.model.checkDBForUser(session, credentials, response, this.loginHandler);
    };
    LoginController.prototype.loginHandler = function (session, credentials, DBInfo, response) {
        if (DBInfo.error) {
            response.json(DBInfo.error);
        }
        else {
            if (this.credentialsMatch(DBInfo, credentials)) {
                session.token = jwt.sign(DBInfo, config.jwtSecret);
                response.json({ success: 'Successfull login' });
            }
            else {
                response.json({ error: 'Wrong username or password' });
            }
        }
    };
    LoginController.prototype.credentialsMatch = function (DBInfo, credentials) {
        if (credentials.password == DBInfo.password) {
            return true;
        }
        return false;
    };
    return LoginController;
})();
module.exports = LoginController;
//# sourceMappingURL=LoginController.js.map