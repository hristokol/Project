///<reference path='RegisterModel.ts'/>
///<reference path='../ValidatorClasses/FormValidator.ts'/>
'use strict'
import RegisterModel=require('./RegisterModel');
import FormValidator=require('../ValidatorClasses/FormValidator');
class RegisterController {
    private model;
    private validator;

    constructor() {
        this.model = new RegisterModel();
        this.validator = new FormValidator();
    }

    public register(formData:any, response:any):void {
        //To-Do:password should be secured and redundant fields should be deleted
        if (this.validator.formValid(formData)) {
            this.model.register(formData, response, this.registerHandler);
        } else {
            response.json({error: 'Form invalid'});
        }
    }

    private registerHandler(status:any, response:any):void {
        if (status.error) {
            response.json({error: status.error});
        }
        if (status.success) {
            response.json({success: status.success});
        }
    }
}
export=RegisterController;