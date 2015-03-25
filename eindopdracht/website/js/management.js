
	function getAllRaces(callback)
	{
		$.get("http://localhost:3000/races", function(response)
		{
			callback(response);
		});
	}
