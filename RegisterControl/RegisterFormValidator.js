///<reference path='../node.d.ts'/>
var validator = require('validator');
var RegisterFormValidator = (function () {
    function RegisterFormValidator() {
    }
    RegisterFormValidator.prototype.nameValid = function (name, response) {
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
    };
    RegisterFormValidator.prototype.surnameValid = function (surname, response) {
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
    };
    RegisterFormValidator.prototype.emailValid = function (email, repeatEmail, response) {
        var emailExists = !(!email || email == undefined || email == null);
        var repeatEmailExists = !(!repeatEmail || repeatEmail == undefined || repeatEmail == null);
        var emailValid = emailExists && repeatEmailExists && validator.isEmail(email) && validator.isEmail(repeatEmail) && (email == repeatEmail);
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
    };
    RegisterFormValidator.prototype.passwordValid = function (password, repeatPassword, response) {
        var passwordExists = !(password == 'undefined' && !password || password == undefined || password == null);
        var repeatPasswordExists = !(repeatPassword == 'undefined' && !repeatPassword || repeatPassword == undefined || repeatPassword == null);
        var passwordValid = passwordExists && password.length >= 6 && /[a-zA-Z0-9]/.test(password);
        var repeatPasswordValid = repeatPasswordExists && repeatPassword === password;
        if (passwordValid && repeatPasswordValid) {
            return true;
        }
        return false;
    };
    RegisterFormValidator.prototype.formValid = function (formData) {
        var nameValid = this.nameValid(formData.name);
        var surnameValid = this.surnameValid(formData.surname);
        var emailValid = this.emailValid(formData.email, formData.repeatEmail);
        var passwordValid = this.passwordValid(formData.password, formData.repeatPassword);
        return nameValid && surnameValid && emailValid && passwordValid;
    };
    return RegisterFormValidator;
})();
module.exports = RegisterFormValidator;
//# sourceMappingURL=RegisterFormValidator.js.map