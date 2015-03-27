var express = require('express');
var router = express.Router();

module.exports = function(mongoose){

	var Race =  mongoose.model('Race');

	router.route('/')
		.get(function(req, res) {
			res.setHeader('Access-Control-Allow-Origin','*');
			Race.find(function(err, races) {
		    if (err)
		    {
				res.send(err);
		    }
		    else
		    {
		    	res.json(races);
		    }
			});
		})
		.post(function(req, res) {
			var _race = new Race(req.body);
			var waypoints = JSON.parse(req.body.way);
			for(var index in waypoints)
			{
				var way = waypoints[index];
				_race.waypoints.push({placeid: way.placeid, name: way.name, latitude: way.latitude, longitude: way.longitude});
			}
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
		    if (err)
		    {
		    	res.send(err);
		    }
		    else
		    {
		    	res.send("ok");
		    } 
		  }); 
		})
		.get(function(req, res)
		{     
			Race.findById(req.params.id, function(err, race) {
			//race.waypoints.push({placeid: "ChI72o-0Zf1xkcRdF_M2RNO_KI", name: "Servex Geldermalsen", latitude: 51.882394, longitude: 5.286363});
			race.save(function(error)
			{
				if (err)
		        {
		          res.send(err);
		        }
		        else
		        {
		          res.json(race);
		        }
			});
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
			 

			  		var waypoints = JSON.parse(req.body.way);
			  		race.waypoints = [];
					for(var index in waypoints)
					{
						var way = waypoints[index];
						race.waypoints.push({placeid: way.placeid, name: way.name, latitude: way.latitude, longitude: way.longitude});
					}
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

		router.route('/:raceid/waypoint/:waypointid')
		.delete(function(req, res) {

			var raceid = req.params.raceid;
			var waypointid = req.params.waypointid;
			Race.findById(raceid, function(err, race) {
			    if (err)
			    {
					res.send(err);
			    }
			    else
			    {
					 for (var i = 0; i<race.waypoints.length; i++) {
				        var waypoint = race.waypoints[i];
				        if(waypoint == waypointid)
				        {
				            race.waypoints.splice(i,1);
				            break;
				        }
				    }
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
		})
		.post(function(req, res){

			var raceid = req.params.raceid;
			var waypointid = req.params.waypointid;

			Race.findById(raceid, function(err, race) {
			    if (err)
			    {
					res.send(err);
			    }
			    else
			    {
			    	race.waypoints.push(waypointid);
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

		router.route('/:raceid/waypoint/:waypointid/user/:userid')
		.post(function(req, res){
			var raceid = req.params.raceid;
			var userid = req.params.userid;
			var waypointid = req.params.waypointid;
			Race.findById(raceid, function(err, race) {
			    if (err)
			    {
					res.send(err);
			    }
			    else
			    {
			    	for (var i = 0; i<race.waypoints.length; i++) {
				        var waypoint = race.waypoints[i];
				        if(waypoint._id == waypointid)
				        {
				        	waypoint.users.push(userid);
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
				            break;
				        }
				    }
			    }
			});
		});

		router.route('/:raceid/user/:userid')
		.delete(function(req, res) {

			var raceid = req.params.raceid;
			var userid = req.params.userid;
			Race.findById(raceid, function(err, race) {
			    if (err)
			    {
					res.send(err);
			    }
			    else
			    {
					 for (var i = 0; i<race.users.length; i++) {
				        var user = race.users[i];
				        if(user == userid)
				        {
				            race.users.splice(i,1);
				            break;
				        }
				    }
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
		})
		.post(function(req, res){

			var raceid = req.params.raceid;
			var userid = req.params.userid;

			Race.findById(raceid, function(err, race) {
			    if (err)
			    {
					res.send(err);
			    }
			    else
			    {
			    	race.users.push(userid);
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
