// var connection
// window.addEventListener("load", function () {

// 		connection = new WebSocket("ws://"+window.location.hostname+":5500")
// 		connection.onopen = function () {
// 			alert("Connectie open");
// 		 }

// 		connection.onclose = function () {
// 			console.log("Connection closed")
// 		}
// 		connection.onerror = function () {
// 			console.error("Connection error")
// 		}
// 		connection.onmessage = function (evt) {
// 			alert("Message binnen gekregen " + JSON.stringify(evt));
// 			var json = JSON.parse(evt.data);
// 			var race = json.data.race;
// 			var user = json.data.user;
// 			var waypoint = json.data.waypoint;
// 			var winner = json.data.winner;
// 			var raceid = $("#races").val();
// 			if(raceid == race)
// 			{
// 				$("#"+waypoint).append("<li>" + user + "</li>");
// 				if(winner != null)
// 				{
// 					alert("Er heeft zojuist iemand de race gewonnen, van harte gefeliciteerd " + winner);
// 				}
// 			}
// 		}
		
// });
// function sendMessageToClients(message)
// {
// 	alert("message naar server verstuurd");
// 	 connection.send(message);
// }

 var host = location.origin.replace(/^http/, 'ws')
      var ws = new WebSocket("ws://"+window.location.hostname+":5000")
      ws.onmessage = function (event) {
        var li = document.createElement('li');
        li.innerHTML = JSON.parse(event.data);
        document.querySelector('#pings').appendChild(li);
      };