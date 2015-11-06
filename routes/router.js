///<reference path='../RegisterControl/RegisterFormUploadController.ts'/>
'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('../routeConfig.js');
var LoginController = require('../LoginControl/LoginController');
var loginControl = new LoginController();
var RegisterFormUploadController = require('../RegisterControl/RegisterFormUploadController');
var registerUploadFormController = new RegisterFormUploadController();
router.use(config.session(config.sessionOptions));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

router.get('/', loginControl.loginRequired, function (request, response) {
        response.render('../public/SocialNetwork/index.html', {token:request.session.token});
});
router.get('/login', loginControl.notLogged, function (request, response) {
    response.render('../public/SocialNetwork/login.html');
});
router.post('/login', loginControl.notLogged, function (request, response) {
    loginControl.login(request.session, request.body, response);
});
router.get('/register', loginControl.notLogged, function (request, response) {
    response.render('../public/SocialNetwork/register.html');
});
router.post('/register', loginControl.notLogged, registerUploadFormController.upload, function (request, response) {
    console.log(request.body);
});

module.exports = router;