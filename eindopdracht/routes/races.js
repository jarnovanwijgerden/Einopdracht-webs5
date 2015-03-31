var express = require('express');
var router = express.Router();

module.exports = function(mongoose){

	var Race =  mongoose.model('Race');
	var isAdmin = function(req, res, next)
	{
		if(req.isAuthenticated() && req.user.admin)
		//if(req.isAuthenticated())
		{

			return next();
		}

		res.status(401).send('Niet gemachtigd');
	}
	router.route('/')
		.get(function(req, res) {
			Race.find().populate('waypoints.users').exec(function (err, races) {
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
		.post(isAdmin, function(req, res) {

			var _race = new Race(req.body);


			if(req.body.way)
			{
				var waypoints = JSON.parse(req.body.way);
				for(var index in waypoints)
				{
					var way = waypoints[index];
					_race.waypoints.push({placeid: way.placeid, name: way.name, latitude: way.latitude, longitude: way.longitude});
				}
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

	router.route('/search/:query')
		.get(function(req, res) {

			var query = req.params.query;
			query = query.replace("query=", "");
			var query = query.split("&");

			var name = query[0];
			var status = query[1];
			Race
			.find()
			.where('name').equals(name)
			.where('status').equals(status)
			.exec(function (err, races) {

				if (err)
			    {
					res.send(err);
			    }
			    else
			    {
			    	res.json(races);
			    }

			});
		});

	router.route('/:id')
		.delete(isAdmin, function(req, res) {
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
			Race.findById(req.params.id).populate('waypoints.users').exec(function (err, race) {
				if (err)
			    {
					res.send(err);
			    }
			    else
			    {
			    	res.json(race);
			    }
	      });
		})
		.put(isAdmin, function(req, res)
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
			 		var newwaypoints = [];
			 		if(req.body.way)
			 		{
			 		
						var waypoints = JSON.parse(req.body.way);
				  		//race.waypoints = [];
						for(var index in waypoints)
						{
							var way = waypoints[index];

							var _users = syncUsersByWaypoint(way.waypoint, race.waypoints);
							newwaypoints.push({placeid: way.placeid, name: way.name, latitude: way.latitude, longitude: way.longitude, users: _users});
						}

			 		}
			  		
					race.waypoints = newwaypoints;
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
			
			var allowed = checkIfUserIsOnPreviousWayPoints(race, waypointid, userid);
			var alreadyExist = checkUserAlreadyOnWayPoint(race, waypointid, userid);
			    if (err || alreadyExist || allowed == false)
			    {
					res.status(400).send('err');
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
							    	res.status(300).send('err');
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
					    	res.send("err");
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
		function checkUserAlreadyOnWayPoint(race, waypointid, userid)
		{

			for (var i = 0; i<race.waypoints.length; i++) {
		        var waypoint = race.waypoints[i];
		        if(waypoint._id == waypointid)
		        {

			        for (var index = 0; index < waypoint.users.length; index++) {

			        		var user = waypoint.users[index];

			        		if(user == userid)
			        		{
			        			return true;
			        		}
			        	}
		     	}
		    }
		    return false;
		}
		function checkUserOnWaypoint(waypoint, userid)
		{

			for(var index in waypoint.users)
			{
				var user = waypoint.users[index];
				if(user == userid)
				{
					return true;
				}
			}
			return false;

		}
		function syncUsersByWaypoint(waypointid, waypoints)
		{
			for(var way in waypoints)
			{
				var waypoint = waypoints[way];
				if(waypoint._id == waypointid && waypointid != null)
				{
					return waypoint.users;
				}
			}
			return [];
		}
		function checkIfUserIsOnPreviousWayPoints(race, waypointid, userid)
		{

			var check = true;
			for(var index in race.waypoints)
			{
				var waypoint = race.waypoints[index];

				if(waypoint._id == waypointid)
				{
					for(var i=0; i<index; i++)
					{
			
						var onpoint = checkUserOnWaypoint(race.waypoints[i], userid);
						if(onpoint == false)
						{
							return false;
						}
					}
				}
			}
			return true;
		}

	return router;
};
