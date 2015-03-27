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

	function addUserToWaypoint(userid, raceid, callback)
	{
		var url = "races/" + raceid + "/user/ " + userid;
		$.post(url, function(response)
		{
			alert(response);
		});
	}
