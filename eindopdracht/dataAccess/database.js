var mongoose = require('mongoose');

module.exports = function(){

		var uri = 'mongodb://localhost:27017/eindopdracht';
		mongoose.connect(uri);
	return mongoose;
}