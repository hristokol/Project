///<reference path='RegisterModel.ts'/>
'use strict'
import RegisterModel=require('RegisterModel');
class RegisterController {
    private model;
    constructor() {
    this.model=new RegisterModel();
    }

    public register(formData:any, response:any):void {
        this.model.register(formData,response,this.registerHandler);
    }

    private registerHandler(status:any, response:any):void {
        if (status.error) {
            response.json({error: status.error});
        }
        if (status.success) {
            response.json({success:status.success});
        }
    }
}
export=RegisterController;