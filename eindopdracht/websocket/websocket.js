
var http = require("http");
var ws = require("nodejs-websocket")
var fs = require("fs");


var server = ws.createServer(function (connection) {
    connection.on("text", function (str) {
    var _message  = JSON.parse(str);
    var obj = 
    {
        race: _message.race,
        user: _message.user,
        waypoint: _message.waypoint,
        winner: _message.winner
    };
    var json = JSON.stringify({ type:'message', data: obj });
     broadcast(json)
    })
    connection.on("error", function(err)
    {

    })
})
server.listen(8081)

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
}