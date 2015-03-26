
	function getAllRaces(callback)
	{
		$.get("races", function(response)
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
				var lng = response.results[race].geometry.location.lng;
				var lat = response.results[race].geometry.location.lat;
				
				$("#resultpoints").append('<li><a  lat="' + lat+ '" lng="' + lng+ '" place-id="' + response.results[race].place_id + '">' + response.results[race].name + '</a></li>');
			}
			$("#resultpoints").listview("refresh");
		});
	}

	function saveRace()
	{

		var _waypoints = [];

		var listItems = $("#waypoints li a");
		listItems.each(function(idx, a) {
			var point = $(a);

			var _name = point.text();
			var _placeid = point.attr("place-id");
			var _lng = point.attr("lng");
			var _lat = point.attr("lat");

			_waypoints.push({placeid: _placeid, name: _name, latitude: _lat, longitude: _lng});
		});

		var _name = $("#racename").val();
		var _description = $("#racedescrip").val();
		var _status = $("#racestatus").val();
		var _startdatum = $("#racestartdate").val();
		var stringify = JSON.stringify(_waypoints);
		var URI = "races";
		console.log("Dit is de stringify " + stringify);
		alert(_status); 
		$.post(URI, { name: _name, description:_description, startdatum: _startdatum, status: _status, way: stringify}, function(response)
		{
			alert(JSON.stringify(response));
		});

	}