///<reference path='../DBConnectionSingleton.ts'/>
'use strict'
import DBConnection=require('../DBConnectionSingleton');
class LoginModel {
    private couchbaseBucket;

    constructor() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }

    public checkDBForUser(session:any, credentials,response:any, next):void {
        var self = this;
        self.couchbaseBucket.get('user::email::' + credentials.email, function (error, result) {
            if (!error && result) {
                next(session, credentials, result.value,response);
            } else if (error && error.code == 13) {
                next({error: 'Wrong email or password',response:response});
            }
        });
    }

}
export=LoginModel;