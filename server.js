var express = require("express");
var socketio = require("socket.io")
var app = express();
var library = require("./Library");
var server = require("http").createServer(app);
var io = socketio.listen(server)
var queue = require("./MusicQueue");
io.set('log level', 1);
/* Frontend */
app.use("/frontend", express.static("./frontend"));

app.get("/", function(req,res) {
	res.redirect("frontend");
});

/* API */
app.get("/api/library", function(req,res){
	res.json(library.getLibrary());
});


queue.setChangeCallback(function() 
{
	io.sockets.emit("queueChanged", queue.getSendable());
});



library.init("library.csv", function()
{
	console.log("Library ready!");
	server.listen(8080);
});


io.sockets.on('connection', function (socket) {
	socket.emit("resync", {library:library.getLibrary(), queue:queue.getQueue()});
	socket.on("addToQueue", function (songid)
	{
		queue.addToQueue(library.getSongByID(songid));
	});
	socket.on("pause", function()
	{
		queue.pause();
	});
	socket.on("skip", function()
	{
		queue.skip();
	});
	
});
