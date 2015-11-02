///<reference path='../node.d.ts'/>
'use strict'
var validator = require('validator');
var emailExistenceChecker = require('email-existence');
class FormValidator {
    constructor() {

    }

    private nameValid(name:string):boolean {
        if (name && name != undefined && name != null && validator.isAlpha(name)) {
            return true;
        }
        return false;
    }

    private surnameValid(surname:string):boolean {
        if (surname && surname != undefined && surname != null && validator.isAlpha(surname)) {
            return true;
        }
        return false;
    }

    private emailValid(email:string, repeatEmail:string):boolean {
        if (email && repeatEmail) {
            return validator.isEmail(email) && (email === repeatEmail);
        }
        return false;
    }

    private emailExists(email:string, repeatEmail:string) {
        if (this.emailValid(email, repeatEmail)) {
            emailExistenceChecker.check(email, function (error, response) {
               if(error){
                   console.log(error);
                   return  false;
               }
                if(response){
                    console.log(response);
                    return true;
                }
            });
        }
       // return false;
    }

    private passwordValid(password:string, repeatPassword:string):boolean {
        if (password && repeatPassword) {
            return password.length >= 6 && /[a-zA-Z0-9]/.test(password) && repeatPassword === password;
        }
        return false;
    }

    //To-Do:Position and team leader validation

    public formValid(formData:any):boolean {
        var nameValid:boolean = this.nameValid(formData.name);
        var surnameValid:boolean = this.surnameValid(formData.surname);
        var emailValid:boolean = this.emailValid(formData.email, formData.repeatEmail);
        var passwordValid:boolean = this.passwordValid(formData.password, formData.repeatPassword);
        return nameValid && surnameValid && emailValid && passwordValid;
    }

}
export=FormValidator;