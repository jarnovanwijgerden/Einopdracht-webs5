
	function getAllRaces(callback)
	{
		$.get("http://localhost:3000/races", function(response)
		{
			callback(response);
		});
	}
	function getJSONFromURL(url, callback)
	{
		$.get(url, function(response)
		{
			callback(response);
		});
	}
