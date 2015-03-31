process.env.NODE_ENV = 'test';
var app = require('../app');
var User = require('mongoose').model('User');
var request = require('supertest');
var passportStub = require('passport-stub');
var testdata = require('./testData');
var expect = require('chai').expect;

passportStub.install(app);


describe('Test for authors routing', function(){
	describe('Get /Users', function(){
		beforeEach(function(done){
			console.log("Hiero");
			testdata.fillTestdata(done);
			//done();
		});

		it('Should return 200 status when getting users', function(done){
			request(app)
				.get('/users')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});

		it('Get races should return 5 users', function(done){
			request(app)
				.get('/users')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					expect(res.body).to.have.length(5);
					done();
				});
		});

		it('Get races should return a login', function(done){
			request(app)
				.get('/login')
				.send({ username: 'jarno', password: 'jarno'})
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});

		it('Get races should return a register', function(done){
			request(app)
				.get('/register')
				.send({firstName: 'Louis', middleName: '', lastName: 'Hol', age: 20, admin: true, username: "louis", password:"louis"})
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});
	});
});