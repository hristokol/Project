///<reference path='../node.d.ts'/>
'use strict'
var validator = require('validator');
class FormValidator {
    constructor() {

    }

    private nameValid(name:string, response?:any):boolean {
        if (name && name != undefined && name != null && validator.isAlpha(name)) {
            return true;
        }
        /*else if (!name || name == undefined || name == null) {
         response.json({error: 'Name field is mandatory'});
         return false;
         } else if (name && !validator.isAlpha(name)) {
         response.json({error: 'Name should only contain alphabetical characters'});
         return false;
         }*/
        return false;
    }

    private surnameValid(surname:string, response?:any):boolean {
        if (surname && surname != undefined && surname != null && validator.isAlpha(surname)) {
            return true;
        }
        /*else if (!surname && surname == undefined && surname == null) {
         response.json({error: 'Surname field is mandatory'});
         return false;
         } else if (surname && !validator.isAlpha(surname)) {
         response.json({error: 'Surname should only contain alphabetical characters'});
         return false;
         }*/
        return false;
    }

    private emailValid(email:string, repeatEmail:string, response?:any):boolean {
        var emailExists:boolean = !(!email || email == undefined || email == null);
        var repeatEmailExists:boolean = !(!repeatEmail || repeatEmail == undefined || repeatEmail == null);
        var emailValid:boolean = emailExists && repeatEmailExists && validator.isEmail(email) && validator.isEmail(repeatEmail) && (email == repeatEmail);
        if (emailValid) {
            return true;
        }
        /*else if (!emailExists) {
         response.json({error: 'Email field is mandatory'});
         return false;
         } else if (!validator.isEmail(email)) {
         response.json({error: 'Email is not valid'});
         return false;
         } else if (!repeatEmailExists) {
         response.json({error: 'Repeat Email field is mandatory'});
         return false;
         } else if (email !== repeatEmail) {
         response.json({error: 'Email fields don\'t match'});
         return false
         }*/
        return false;
    }

    private passwordValid(password:string, repeatPassword:string, response?:any):boolean {
        var passwordExists:boolean = !(password == 'undefined' && !password || password == undefined || password == null);
        var repeatPasswordExists:boolean = !(repeatPassword == 'undefined' && !repeatPassword || repeatPassword == undefined || repeatPassword == null);
        var passwordValid:boolean = passwordExists && password.length >= 6 && /[a-zA-Z0-9]/.test(password);
        var repeatPasswordValid:boolean = repeatPasswordExists && repeatPassword === password;
        if (passwordValid && repeatPasswordValid) {
            return true;
        }
        return false;
    }

    public formValid(formData:any):boolean {
        var nameValid:boolean = this.nameValid(formData.name);
        var surnameValid:boolean = this.surnameValid(formData.surname);
        var emailValid:boolean = this.emailValid(formData.email, formData.repeatEmail);
        var passwordValid:boolean = this.passwordValid(formData.password, formData.repeatPassword);
        return nameValid && surnameValid && emailValid && passwordValid;
    }

}
export=FormValidator;