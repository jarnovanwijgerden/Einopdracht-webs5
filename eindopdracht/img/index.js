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
