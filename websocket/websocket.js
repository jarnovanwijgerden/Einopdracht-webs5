module.exports = function(server){
var io = require('socket.io')(server);
console.log("Hij zit wel in de socket");
io.on('connection', function(socket){

	socket.on('checkin', function(msg){
	var _message  = JSON.parse(msg);
    var obj = 
    {
        race: _message.race,
        user: _message.user,
        waypoint: _message.waypoint,
        winner: _message.winner
    };
    var json = JSON.stringify(obj);

	io.emit('checkin', json);
	});
});
}