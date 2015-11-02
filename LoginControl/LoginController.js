///<reference path='../node.d.ts'/>
///<reference path='LoginModel.ts'/>
'use strict';
var jwt = require('jsonwebtoken');
var config = require('../routeConfig.js');
var LoginModel = require('./LoginModel');
var self;
var LoginController = (function () {
    function LoginController() {
        this.model = new LoginModel();
        self = this;
    }
    LoginController.prototype.loginRequired = function (request, response, next) {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            next();
        }
        catch (exception) {
            response.redirect('/login');
        }
    };
    LoginController.prototype.notLogged = function (request, response, next) {
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
    LoginController.prototype.loginHandler = function (DBInfo, response, session, credentials) {
        if (DBInfo.error) {
            response.json({ error: DBInfo.error });
        }
        else {
            if (self.credentialsMatch(DBInfo, credentials)) {
                session.token = jwt.sign(DBInfo, config.jwtSecret);
                response.json({ success: 'Successfull login' });
            }
            else {
                response.json({ error: 'Wrong username or password' });
            }
        }
    };
    LoginController.prototype.credentialsMatch = function (DBInfo, credentials) {
        //To-Do:Secure password with bcrypt
        return credentials.password == DBInfo.password;
    };
    return LoginController;
})();
module.exports = LoginController;
//# sourceMappingURL=LoginController.js.map