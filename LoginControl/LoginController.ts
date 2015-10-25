///<reference path='../node.d.ts'/>
///<reference path='LoginModel.ts'/>
'use strict'
var jwt = require('jsonwebtoken');
var config = require('../routeConfig.js');
import LoginModel=require('./LoginModel');
class LoginController {
    private model:LoginModel = new LoginModel();

    constructor() {

    }

    public isLogged(request:any, response:any, next):void {
        try {
            jwt.verify(request.session.token, config.jwtSecret);
            next();
        } catch (exception) {
            response.redirect('/signin');
        }
    }

    public loggedState(request:any, response:any, next):void {
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

    private loginHandler(session:any, credentials:any, DBInfo:any, response:any) :void{
        if (DBInfo.error) {
            response.json(DBInfo.error);
        } else {
            if (this.credentialsMatch(DBInfo, credentials)) {
                session.token = jwt.sign(DBInfo, config.jwtSecret);
                response.json({success: 'Successfull login'});
            }else{
                response.json({error:'Wrong username or password'});
            }
        }
    }

    private credentialsMatch(DBInfo:any, credentials:any):boolean {
        if (credentials.password == DBInfo.password) {
            return true;
        }
        return false;
    }

}

export = LoginController;