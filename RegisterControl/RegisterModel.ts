///<reference path='../node.d.ts'/>
///<reference path='../DBConnectionSingleton.ts'/>
'use strict'
var uuid = require('node-uuid');
import DBConnection=require('../DBConnectionSingleton');
class RegisterModel {
    private couchbaseBucket;

    constructor() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }

    public register(formData:any, response:any, next):void {
        var self = this;
        var userID = uuid.v4();
        this.couchbaseBucket.insert('user::lookup::email::' + formData.email, {userID: userID}, function (error) {
            if (!error) {
                self.insertRegistration(formData, userID, response, next);
            } else {
                next({error: 'Register error'}, response);
            }
        });

    }

    private insertRegistration(formData:any, userID:string, response:any, next):void {
        this.couchbaseBucket.insert('user::id::' + userID, formData, function (error) {
            if (!error) {
                next({
                    success: 'Successfull registration - redirect to login page in 3 seconds',
                    email: formData.email,
                    name: formData.name
                }, response);
            } else {
                next({error: 'Register error'}, response);
            }
        });
    }
}
export=RegisterModel;