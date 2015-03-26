	function getAllRaces(callback)
	{
		$.get("http://localhost:3000/races", function(response)
		{
			callback(response);
		});
	}

	function getRaceById(id, callback)
	{
		$.get("http://localhost:3000/races/" + id, function(response)
		{
			callback(response);
		});
	}
