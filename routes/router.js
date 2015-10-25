'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('../routeConfig.js');
//var LoginController = require('../LoginControl/LoginController');
//var loginControl = new LoginController();
router.use(config.session(config.sessionOptions));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

router.get('/'/* loginControl.isLogged*/, function (request, response) {
    response.render('../public/SocialNetwork/index.html');
});
router.get('/signin' /*loginControl.loggedState*/, function (request, response) {
    response.render('../public/SocialNetwork/signin.html');
});
router.post('/signin'/*, loginControl.loggedState*/, function (request, response) {
   // loginControl.login(request.session, request.body, response);
});
router.get('/register'/*, loginControl.loggedState*/, function (request, response) {
    response.render('../public/SocialNetwork/register.html');
});
router.post('/register'/*, loginControl.loggedState*/, function (request, response) {
    //loginControl.register();
});

module.exports = router;