///<reference path='node.d.ts'/>
'use strict'
var app = require('express')();
var express = require('express');
var fs = require('fs');
var https = require('https').Server({
    key: fs.readFileSync('https/httpsKey.pem'),
    cert: fs.readFileSync('https/httpsCertificate.pem')
}, app);
var io = require('socket.io')(https);
var routes = require('./routes/router.js');

app.engine('html', require('ejs').renderFile);
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection',function(socket){

});

https.listen(2000, function () {
    console.log('Server is online');
});