// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;
 if (!window.WebSocket) {
       alert("Deze browser wordt niet ondersteunt");
 }
var connection = new WebSocket("ws://"+window.location.hostname+":4000");
console.log("In WebSocket");

connection.onopen = function () {
 console.log("Iemand heeft m geopend");
};
connection.onerror = function (error) {
	alert("Error : "+ error);
};

connection.onmessage = function (message) {
	
	var json = JSON.parse(message.data);
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
};

function sendMessageToClients(message)
{
	 connection.send(message);
}