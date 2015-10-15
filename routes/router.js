'use strict'
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

router.get('/', function (req, res) {
    res.render('../public/facebook/facebook.html');
});


module.exports = router;