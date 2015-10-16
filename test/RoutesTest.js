'use strict'
require('../routes/router.js');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var api = request('https://hristo.com:2000');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Home route test', function () {
    it('Should successfully get home page', function (done) {
        api.get('/').expect(200).end(function (error, response) {
            expect(error).to.not.exist;
            done();
        });
    });
    it('Should successfully get sign in page', function (done) {
        api.get('/signin').expect(200).end(function (error, response) {
            expect(error).to.not.exist;
            done();
        });
    });
    it('Should successfully get register page', function (done) {
        api.get('/register').expect(200).end(function (error, response) {
            expect(error).to.not.exist;
            done();
        });
    });
});