var bcrypt   = require('bcrypt-nodejs');

init = function(mongoos){
	console.log('Initializing User database schema');

		var userSchema = new mongoos.Schema({
			_id: { type: String, required: true, unique: true, lowercase: true },
			firstname: { type: String, required: true },
			lastname: { type: String, required: true },
			age: { type: Number, required: true },
			local            : {
		        email        : String,
		        password     : String
	    	}
	    });

		userSchema.methods.generateHash = function(password) {
	    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		};

		userSchema.methods.validPassword = function(password) {
		    return bcrypt.compareSync(password, this.local.password);
		};
		mongoos.model('User', userSchema);
};

module.exports = init;