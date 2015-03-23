var express = require('express');
var router = express.Router();

module.exports = function(mongoose){

	var Race =  mongoose.model('Race');

	router.route('/')
		.get(function(req, res) {
			Race.find(function(err, races) {
		    if (err)
		      res.send(err);
		    res.json(races);
			});
		})
		.post(function(req, res) {
			var _race = new Race(req.body);
			_race.save(function(err) {
			    if (err)
			    {
			    	res.send(err);
			    }
			    else
			    {
			    	res.json(_race);
			    }
		    });
	    });
	router.route('/:id')
		.delete(function(req, res) {
		  Race.findByIdAndRemove(req.params.id, function(err) {
		    if ("ERROR " + err)
		    {
		    	res.send(err);
		    }
		    else
		    {
		    	res.send("ok");
		    } 
		  }); 
		})
		.put(function(req, res)
		{ 
			Race.findById(req.params.id, function(err, race) {
			    if (err)
			    {
			    	res.send(err);
			    }
			    else
			    {
			    	var _race = new Race(req.body);
			    	race.name = _race.name;
			    	race.description = _race.description;
			    	race.startdatum = _race.startdatum;
			    	race.status = _race.status;
			    	race.users = _race.users;
			    	race.waypoints = _race.waypoints;
			    	race.save(function(err) {
				    if (err)
				    {
				    	res.send(err);
				    }
				    else
				    {
				    	res.json(race);
				    }
		    		});
			    }
			});
		});

	return router;
};
