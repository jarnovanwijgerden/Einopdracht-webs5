
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

			for(var index in response.results)
			{
				var race = response.results[index];
				$("#resultpoints").append('<li><a long="' + race.geometry.location.lng + '" lat="' + race.geometry.location.lat + '" place-id="' + race.place_id + '">' + race.name + '</a></li>');
			}
			$("#resultpoints").listview("refresh");
		});
	}

	function saveRace()
	{
		alert("Race word opgeslagen");
		var _name = $("#racename").val();
		var _description = $("#racedescrip").val();
		var _status = $("#racestatus").val();
		var _startdatum = $("#racestartdate").val();

		var URI = "http://localhost:3000/races";

		alert(_status);

		$.post(URI, { name: _name, description:_description, startdatum: _startdatum, status: _status}, function(response)
		{
			alert(JSON.stringify(response));
		});
	}
