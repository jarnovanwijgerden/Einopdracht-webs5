
// var http = require("http");
// var ws = require("nodejs-websocket")
// var fs = require("fs");


// var server = ws.createServer(function (connection) {
//     console.log("Er is een nieuwe verbinding");
//     connection.on("text", function (str) {


//     console.log("Nieuwe message");
//     var _message  = JSON.parse(str);
//     var obj = 
//     {
//         race: _message.race,
//         user: _message.user,
//         waypoint: _message.waypoint,
//         winner: _message.winner
//     };
//     var json = JSON.stringify({ type:'message', data: obj });
//      broadcast(json)
//     })
//     connection.on("error", function(err)
//     {

//     })
// })
// server.listen(5500)

// function broadcast(str) {
//     server.connections.forEach(function (connection) {
//         connection.sendText(str)
//     })
// }

var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5500

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 5500)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})