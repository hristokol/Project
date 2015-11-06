///<reference path='node.d.ts'/>
'use strict';
var config = require('./routeConfig.js');
var app = require('express')();
var express = require('express');
var fs = require('fs');
var https = require('https').Server({
    key: fs.readFileSync('https/httpsKey.pem'),
    cert: fs.readFileSync('https/httpsCertificate.pem')
}, app);
var io = require('socket.io')(https);
var socketIOJWT = require('socketio-jwt');
var routes = require('./routes/router.js');
app.engine('html', require('ejs').renderFile);
app.use('/', routes);
app.use(express.static(__dirname + '/public'));
io.use(socketIOJWT.authorize({
    secret: config.jwtSecret,
    timeOut: 20 * 1000,
    handshake: true
}));
io.sockets.on('connection', function (socket) {
    console.log('socket connection established by ' + socket.decoded_token.name);
});
https.listen(2000, function () {
    console.log('Server is online');
});
//# sourceMappingURL=app.js.map