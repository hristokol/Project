'use strict'
var uuid = require('node-uuid');
var cookieSecret = uuid.v4();
var jwtSecret = uuid.v4();
var session = require('client-sessions');
var cookieOptions = {ephemeral: false, httpOnly: true, secure: true};
var sessionDuration = 5 * 60 * 1000;
var sessionOptions = {cookieName: 'session', secret: cookieSecret, duration: sessionDuration, cookie: cookieOptions};
module.exports = {session:session,sessionOptions:sessionOptions};