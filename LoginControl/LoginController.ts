///<reference path='../node.d.ts'/>
///<reference path='LoginModel.ts'/>
'use strict'
var jwt = require('jsonwebtoken');
var config = require('../routeConfig.js');
import LoginModel=require('./LoginModel');
var self;
class LoginController {
    private model:LoginModel = new LoginModel();

    constructor() {
        self = this;
    }

    public loginRequired(request:any, response:any, next):void {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            next();
        } catch (exception) {
            response.redirect('/login');
        }
    }

    public notLogged(request:any, response:any, next):void {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            response.redirect('/');
        } catch (exception) {
            next();
        }
    }

    public login(session:any, credentials:any, response:any):void {
        this.model.checkDBForUser(session, credentials, response, this.loginHandler);
    }

    private loginHandler(DBInfo:any, response:any, session?:any, credentials?:any):void {
        if (DBInfo.error) {
            response.json({error: DBInfo.error});
        } else {
            if (self.credentialsMatch(DBInfo, credentials)) {
                session.token = jwt.sign(DBInfo, config.jwtSecret);
                response.json({success: 'Successfull login'});
            } else {
                response.json({error: 'Wrong username or password'});
            }
        }
    }

    private credentialsMatch(DBInfo:any, credentials:any):boolean {
        //To-Do:Secure password with bcrypt
        return credentials.password == DBInfo.password;
    }

}

export = LoginController;