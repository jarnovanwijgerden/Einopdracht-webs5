process.env.NODE_ENV = 'test';
var app = require('../app');
var User = require('mongoose').model('User');
var request = require('supertest');
var passportStub = require('passport-stub');
var testdata = require('./testData');
var expect = require('chai').expect;

passportStub.install(app);

 
describe('Test for index routing', function(){

		it('Should return javascript file from static folder "IMG"', function(done){
			request(app)
				.get('/js/index.js')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});

		it('Should return css file', function(done){
			request(app)
				.get('/css/style.css')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});

		it('Management not allowed when not logged in as admin', function(done){
			request(app)
				.get('/management')
				.expect(302)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});

		it('Login page should return 200 status', function(done){
			request(app)
				.get('/login')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});
		it('Login page should return 200 status', function(done){
			request(app)
				.get('/register')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});
});
