	function getAllRaces(callback)
	{
		$.get("races", function(response)
		{
			callback(response);
		});
	}

	function getRaceById(id, callback)
	{
		$.get("races/" + id, function(response)
		{
			callback(response);
		});
	}


	function addUserToWaypoint(raceid,waypointid, userid, callback)
	{
		var url = "races/" + raceid + "/waypoint/" + waypointid + "/user/" + userid;
		$.post(url, function(response)
		{
			callback(response);
		});
	}
