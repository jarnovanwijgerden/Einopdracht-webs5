var async = require('async');

function fillUsers(done){
	console.log("Test users worden aagemaakt");
	var User = require('mongoose').model('User');
	User.remove({}, function(){
		async.parallel([
			function(cb) { new User({ _id: 'eerste', firstName: 'Louis', middleName: '', lastName: 'Hol', age: 20, admin: true, local: {username: "louis", password:"louis"}}).save(cb); },
			function(cb) { new User({ _id: 'tweede', firstName: 'Jarno', middleName: 'van', lastName: 'Wijgerden', age: 21, admin: true, local: {username: "jarno", password:"jarno"}}).save(cb); },
			function(cb) { new User({ _id: 'derde', firstName: 'Rick', middleName: 'de', lastName: 'Jong', age: 24, admin: false, local: {username: "james", password:"dejong"}}).save(cb); },
			function(cb) { new User({ _id: 'vierde', firstName: 'James', middleName: 'de', lastName: 'Jong', age: 22, admin: false, local: {username: "rick", password:"dejong"}}).save(cb); },
			function(cb) { new User({ _id: 'vijfde', firstName: 'Martijn', middleName: '', lastName: 'Schuurmans', age: 25, admin: true, local: {username: "martijn", password:"schuurmans"}}).save(cb); }
		], function() {
			done();
		})
	});
};




function fillRaces(done){
	console.log("Test races worden aagemaakt");
	var Race = require('mongoose').model('Race');
	Race.remove({}, function(){
		async.parallel([
			function(cb) { new Race({ _id: 'eerste', name: 'Race 1', description: 'Leuke race 1', startdatum: '2015-10-10', status: "Open"}).save(cb); },
			function(cb) { new Race({ _id: 'tweede', name: 'Race 2', description: 'Leuke race 2', startdatum: '2015-10-09', status: "Open"}).save(cb); },
			function(cb) { new Race({ _id: 'derde', name: 'Race 3', description: 'Leuke race 3', startdatum: '2015-10-08', status: "Closed"}).save(cb); },
			function(cb) { new Race({ _id: 'vierde', name: 'Race 4', description: 'Leuke race 4', startdatum: '2015-10-07', status: "Open"}).save(cb); },
			function(cb) { new Race({ _id: 'vijfde', name: 'Race 5', description: 'Leuke race 5', startdatum: '2015-10-06', status: "Open"}).save(cb); },
		], function() {
			done();
		})
	});
};

module.exports = {
	fillTestdata: function(done){
		async.parallel([
			fillUsers,
			fillRaces
		], function(){ done() });
	}
}