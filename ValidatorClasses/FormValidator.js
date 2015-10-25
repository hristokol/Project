///<reference path='../node.d.ts'/>
'use strict';
var validator = require('validator');
var FormValidator = (function () {
    function FormValidator() {
    }
    FormValidator.prototype.nameValid = function (name, response) {
        if (name && name != undefined && name != null && validator.isAlpha(name)) {
            return true;
        }
        return false;
    };
    FormValidator.prototype.surnameValid = function (surname, response) {
        if (surname && surname != undefined && surname != null && validator.isAlpha(surname)) {
            return true;
        }
        return false;
    };
    FormValidator.prototype.emailValid = function (email, repeatEmail, response) {
        var emailExists = !(!email || email == undefined || email == null);
        var repeatEmailExists = !(!repeatEmail || repeatEmail == undefined || repeatEmail == null);
        var emailValid = emailExists && repeatEmailExists && validator.isEmail(email) && validator.isEmail(repeatEmail) && (email == repeatEmail);
        if (emailValid) {
            return true;
        }
        return false;
    };
    FormValidator.prototype.passwordValid = function (password, repeatPassword, response) {
        var passwordExists = !(password == 'undefined' && !password || password == undefined || password == null);
        var repeatPasswordExists = !(repeatPassword == 'undefined' && !repeatPassword || repeatPassword == undefined || repeatPassword == null);
        var passwordValid = passwordExists && password.length >= 6 && /[a-zA-Z0-9]/.test(password);
        var repeatPasswordValid = repeatPasswordExists && repeatPassword === password;
        if (passwordValid && repeatPasswordValid) {
            return true;
        }
        return false;
    };
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