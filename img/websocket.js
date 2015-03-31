var connection
window.addEventListener("load", function () {

		connection = new WebSocket("ws://"+window.location.hostname+":8081")
		connection.onopen = function () { }

		connection.onclose = function () {
			console.log("Connection closed")
		}
		connection.onerror = function () {
			console.error("Connection error")
		}
		connection.onmessage = function (evt) {
			var json = JSON.parse(evt.data);
			var race = json.data.race;
			var user = json.data.user;
			var waypoint = json.data.waypoint;
			var winner = json.data.winner;
			var raceid = $("#races").val();
			if(raceid == race)
			{
				$("#"+waypoint).append("<li>" + user + "</li>");
				if(winner != null)
				{
					alert("Er heeft zojuist iemand de race gewonnen, van harte gefeliciteerd " + winner);
				}
			}
		}
		
});
function sendMessageToClients(message)
{
	 connection.send(message);
}