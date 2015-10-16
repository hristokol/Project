'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

router.get('/', function (request, response) {
    response.render('../public/SocialNetwork/index.html');
});
router.get('/signin',function(request,response){
    response.render('../public/SocialNetwork/signin.html');
});
router.get('/register',function(request,response){
    response.render('../public/SocialNetwork/register.html');
})

module.exports = router;