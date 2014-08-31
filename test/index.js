var expect = require('chai').expect;
var routeLoader = require('../');
var expressApp = require('express')();
var app = require('./fixtures');
var request = require('supertest');

describe('Express Route Loader', function () {
    var agent;

    before(function () {
        agent = request(app);
    });

    it('should map root level urls', function (done) {
        agent
            .get('/')
            .expect(200)
            .expect('root /')
            .end(done);
    });

    it('should map folders and prefix them with the folder name', function (done) {
        agent
            .get('/api')
            .expect(200)
            .expect('api /')
            .end(done);
    });

    it('should map folders and prefix them with the folder name including any extra paths', function (done) {
        agent
            .get('/api/test')
            .expect(200)
            .expect('api /test')
            .end(done);
    });

    it('should map super nested folders', function (done) {
        agent
            .get('/how/deep/does/the/rabbit/hole/go')
            .expect(200)
            .expect('pretty damn deep')
            .end(done);
    });

    it('should throw an error if the folder doesn\'t exist', function () {
        expect(function () {
            routeLoader(expressApp, 'idefdontexist');
        }).to.throw(/Sorry, I'm not sure where that folder is.../);
    });

    it('should throw an error a string is passed as the first argument', function () {
        expect(function () {
            routeLoader('notanexpressapp');
        }).to.throw(/Please pass in a express app instance as the first argument/);
    });
});