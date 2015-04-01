var socket;
window.addEventListener("load", function () {
	
		socket = io();
		socket.on('checkin', function(msg){

			var json = JSON.parse(msg);
			var race = json.race;
			var user = json.user;
			var waypoint = json.waypoint;
			var winner = json.winner;
			var raceid = $("#races").val();

			if(raceid == race)
			{
				$("#"+waypoint).append("<li>" + user + "</li>");
				if(winner != null)
				{
					alert("Er heeft zojuist iemand de race gewonnen, van harte gefeliciteerd " + winner);
				}
			}
		});
		
});
function sendMessageToClients(message)
{
	socket.emit('checkin', message);
}