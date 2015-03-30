process.env.NODE_ENV = 'test';
var app = require('../app');
var UserSchema = require('mongoose').model('User');
var RaceSchema = require('mongoose').model('Race');
var request = require('supertest');
var passportStub = require('passport-stub');
var testdata = require('./testData');
var expect = require('chai').expect;

passportStub.install(app);


describe('Test for race routing', function(){
	describe('Races', function(){
		beforeEach(function(done){
			testdata.fillTestdata(done);
		}); 

		it('Get races should return 200 status when getting races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				})
		});
		it('Get races should return 5 races', function(done){
			request(app)
				.get('/races')
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					expect(res.body).to.have.length(5);
					done();
				});
		});

		it('Post race should return 401 (Unauthorized) status when not logged in as user', function(done){
			request(app)
				.post('/races')
				.expect(401)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});
		it('Post race should return 200 status when logged in as admin', function(done){


			var user = new UserSchema();
			user.firstName = "Louis";
			user.middleName = "";
			user.lastName = "Hol";
			user.age = 20;
			user.admin = true;

			passportStub.login(user);

			request(app)
				.post('/races')
				.send({ name: 'Hello', description: 'World', startdatum: "2015-10-10", status: "Open"})
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});
		});


		it('Get one race should return 200 status ', function(done){

			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.get('/races/'+obj._id)
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});

		it('Delete one race should return 401 (Unauthorized) status ', function(done){

			passportStub.logout();
			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.delete('/races/'+obj._id)
				.expect(401)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});

		it('Delete one race should return 200 status when logged in as amdin ', function(done){

			var user = new UserSchema();
			user.firstName = "Louis";
			user.middleName = "";
			user.lastName = "Hol";
			user.age = 20;
			user.admin = true;

			passportStub.login(user);

			RaceSchema.findOne({name: 'Race 1'}, function(err,obj) { 

			request(app)
				.delete('/races/'+obj._id)
				.expect(200)
				.end(function(err, res){
					if(err) { return done(err); }
					done();
				});

			 });
		});

		it('Add user to waypoint should return 200 status (succes) ', function(done){

			RaceSchema.findOne({name: 'Race 1'}, function(err,race) {
				
				//console.log("DIT IS DE RACE " + JSON.stringify(race));
				var waypointid = race.waypoints[0]._id;
				var raceid = race._id;

				UserSchema.findOne({firstName: 'Louis'}, function(err,user) { 

					var userid = user._id;
					request(app)
						.post('/races/'+raceid+'/waypoint/'+waypointid+"/user/"+userid)
						.expect(200)
						.end(function(err, res){
							if(err) { return done(err); }
							done();
						});
				});
			});
		});

		it('Add user to race should return 1 user', function(done){

			RaceSchema.findOne({name: 'Race 1'}, function(err,race) {
				var raceid = race._id;
				UserSchema.findOne({firstName: 'Louis'}, function(err,user) { 
					var userid = user._id;
					request(app)
						.post('/races/'+raceid+'/user/'+userid)
						.expect(200)
						.end(function(err, res){
							if(err) { return done(err); }
							expect(res.body.users).to.have.length(1);
							done();
						});

				});

			});
		});

		it('Remove user from race, users should return length 0', function(done){

			RaceSchema.findOne({name: 'Race 2'}, function(err,race) {
				UserSchema.findOne({firstName: 'Louis'}, function(err,user) { 
					var userid = user._id;
					race.users.push(userid);
					race.save();
						request(app)
						.delete('/races/'+race._id+'/user/'+userid)
						.expect(200)
						.end(function(err, res){
							if(err) { return done(err); }
							expect(res.body.users).to.have.length(0);
							done();
						});
				});
			});
		});

		it('Should edit race name from race 1 to race 11', function(done){

			RaceSchema.findOne({name: 'Race 1'}, function(err,race) {
			

				var _name = "Race11";
				var _description = "Nieuwe beschrijving";
				var _status = "Closed";
				var _startdatum = "2015-10-10";

				var _way = [{ placeid: "ChIJR10vFTJfxkcRaYKiRpR6sqY", name: "De Kletskop", latitude: "51.877266", longitude: "5.288234" }];
				var json = JSON.stringify(_way);

				request(app)
						.put('/races/'+race._id)
						.send({ name: _name, description: _description, startdatum: _startdatum, status: _status, way: json})
						.expect(200)
						.end(function(err, res){
							if(err) { return done(err); }
							expect("Race11", res.body.name);
							expect(res.body.waypoints).to.have.length(1);
							done();
						});
			});
		});

	});
});