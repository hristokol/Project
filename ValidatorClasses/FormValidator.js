///<reference path='../node.d.ts'/>
'use strict';
var validator = require('validator');
var emailExistenceChecker = require('email-existence');
var FormValidator = (function () {
    function FormValidator() {
    }
    FormValidator.prototype.nameValid = function (name) {
        if (name && name != undefined && name != null && validator.isAlpha(name)) {
            return true;
        }
        return false;
    };
    FormValidator.prototype.surnameValid = function (surname) {
        if (surname && surname != undefined && surname != null && validator.isAlpha(surname)) {
            return true;
        }
        return false;
    };
    FormValidator.prototype.emailValid = function (email, repeatEmail) {
        if (email && repeatEmail) {
            return validator.isEmail(email) && (email === repeatEmail);
        }
        return false;
    };
    FormValidator.prototype.emailExists = function (email, repeatEmail) {
        if (this.emailValid(email, repeatEmail)) {
            emailExistenceChecker.check(email, function (error, response) {
                if (error) {
                    console.log(error);
                    return false;
                }
                if (response) {
                    console.log(response);
                    return true;
                }
            });
        }
        // return false;
    };
    FormValidator.prototype.passwordValid = function (password, repeatPassword) {
        if (password && repeatPassword) {
            return password.length >= 6 && /[a-zA-Z0-9]/.test(password) && repeatPassword === password;
        }
        return false;
    };
    //To-Do:Position and team leader validation
    FormValidator.prototype.formValid = function (formData) {
        var nameValid = this.nameValid(formData.name);
        var surnameValid = this.surnameValid(formData.surname);
        var emailValid = this.emailValid(formData.email, formData.repeatEmail);
        var passwordValid = this.passwordValid(formData.password, formData.repeatPassword);
        return nameValid && surnameValid && emailValid && passwordValid;
    };
    return FormValidator;
})();
module.exports = FormValidator;
//# sourceMappingURL=FormValidator.js.map