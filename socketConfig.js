'use strict'
var uuid = require('node-uuid');
var socketSecret = uuid.v4();
module.exports = {socketSecret: socketSecret};