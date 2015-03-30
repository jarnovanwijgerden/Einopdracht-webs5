process.env.NODE_ENV = 'test';

var app = require('../app');
var User = require('mongoose').model('User');
var request = require('supertest');
var passportStub = require('passport-stub');
// var testdata = require('./testdata');
var expect = require('chai').expect;

passportStub.install(app);

describe('Test for User routing', function(){
	it('Should return 200 status when getting users', function(done){
		request(app)
			.get('/users')
			.expect(200)
			.end(function(err, res){
				if(err) { return done(err); }
				done();
			})
	});
});