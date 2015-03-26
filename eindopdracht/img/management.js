
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
	function getGoogleMapsGeo()
	{
		//var searchBox = new google.maps.places.SearchBox(input);
		var input = /** @type {HTMLInputElement} */(
      	document.getElementById('pac-input'));
  		var searchBox = new google.maps.places.SearchBox(
    	/** @type {HTMLInputElement} */(input));
  		google.maps.event.addListener(searchBox, 'places_changed', function() {

  			  var places = searchBox.getPlaces();
  			  if (places.length == 0) {
			      return;
			  }
			  var place = places[0];
			  loadWaypoints(place.geometry.location);
		});
	}
	function loadWaypoints(GEO)
	{
		
		$("#resultpoints").empty();
		var geo = GEO.lat() + "," + GEO.lng();
		var URI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBiRwy-lPEwPJkfOOG0XPpeT_OCG88Ust8&location="+ geo + "&radius=5000&type=cafe";
		getJSONFromURL(URI, function(response)
		{
			for(var race in response.results)
			{
				$("#resultpoints").append('<li><a name="' + response.results[race].name + '" place-id="' + response.results[race].place_id + '">' + response.results[race].name + '</a></li>');
			}
			$("#resultpoints").listview("refresh");
		});
	}
