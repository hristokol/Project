///<reference path='../DBConnectionSingleton.ts'/>
'use strict'
import DBConnection=require('../DBConnectionSingleton');
class LoginModel {
    private couchbaseBucket;

    constructor() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }

    public checkDBForUser(session:any, credentials, response:any, next):void {
        var self = this;
        self.couchbaseBucket.get('user::lookup::email::' + credentials.email, function (error, result) {
            if (!error && result) {
                self.getUserProfileFromDB(session, credentials, response, result.value.userID, next);
            } else if (error && error.code == 13) {
                next({error: 'Wrong email or password'}, response);
            }else {
                next({error: 'Something went wrong'}, response);
            }
        });
    }

    private getUserProfileFromDB(session:any, credentials, response:any, userID:string, next):void {
        var self = this;
        self.couchbaseBucket.get('user::id::' + userID, function (error, result) {
            if (!error && result /*&& result.value.confirmed == true*/) {
                next(result.value, response, session, credentials);
            } else if (error && error.code == 13) {
                next({error: 'Wrong email or password'}, response);
            } else if (result && result.value.confirmed == false) {
                next({error: 'Your profile awaits confirmation from the team leader you stated in your registration'}, response);
            }else {
                next({error: 'Something went wrong'}, response);
            }
        });
    }

}
export=LoginModel;