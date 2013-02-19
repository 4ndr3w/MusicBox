var express = require("express");
var socketio = require("socket.io")
var app = express();
var library = require("./Library");
var server = require("http").createServer(app);
var io = socketio.listen(server)

/* Frontend */
app.use("/frontend", express.static("./frontend"));

app.get("/", function(req,res) {
	res.redirect("frontend/test.html");
});

/* API */
app.get("/api/library", function(req,res){
	res.json(library.getLibrary());
});




library.init("library.csv", function()
{
	console.log("Library ready!");
	server.listen(8080);
});


io.sockets.on('connection', function (socket) {
	socket.emit("resync", library.getLibrary());
});