process.env.NODE_ENV = 'test';
var app = require('../app');
var User = require('mongoose').model('Race');
var request = require('supertest');
var passportStub = require('passport-stub');
var testdata = require('./testData');
var expect = require('chai').expect;

passportStub.install(app);


describe('Test for race routing', function(){
	describe('Get /Races', function(){
		beforeEach(function(done){
			testdata.fillTestdata(done);
		});

		it('Should return 200 status when getting races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});
		it('should return 5 races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					expect(res.body).to.have.length(5);
					done();
				});
		});
	});
});