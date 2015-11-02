///<reference path='../node.d.ts'/>
'use strict'
var emailer = require('nodemailer');
var config = require('./emailConfig.js');

class EmailSendController {
    private transporter;

    constructor() {
        this.transporter = emailer.createTransport(config.smtpOptions);
    }

    public sendGreetingEmail(email:string, name:string):void {
        var text = 'Hello ' + name + '. We are happy to have you as our user. We hope you have a pleasant experience with our social network :)';
        var mailOptions = {
            from: 'hristo.g.kolev@gmail.com',
            to: email,
            subject: 'New registration',
            text: text
        };
        this.transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
            if (response && response.accepted) {
                console.log('Greeting email sent successfully.');
            }
        });
    }
}
export =EmailSendController;