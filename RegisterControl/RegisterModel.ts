///<reference path='../node.d.ts'/>
///<reference path='../DBConnectionSingleton.ts'/>
'use strict'
import DBConnection=require('../DBConnectionSingleton');
class RegisterModel {
    private couchbaseBucket;

    constructor() {
        this.couchbaseBucket = new DBConnection().getBucket();
    }

    public register(formData:any, response:any, next) {
        //To-Do: form validation
        var reg = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            surname:formData.surname,
            avatar: formData.avatar,
            position: formData.position
        };
        this.couchbaseBucket.insert('user::' + formData.email, reg, function (error) {
            if (!error) {
                next({success: 'Successfull registration', response: response});
            } else {
                next({error: 'Registration error',response:response});
            }
        });
    }
}
export=RegisterModel;