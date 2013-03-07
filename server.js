var express = require("express");
var socketio = require("socket.io")
var app = express();
var library = require("./Library");
var server = require("http").createServer(app);
var config = require("./config");
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

app.get("/api/android/library", function(req,res){
	data = library.getLibrary();
	output = "";
	for ( i = 0; i < data.length; i++ )
	{
		output += data[i].title+"\n";
	}
	res.send(output);
});

app.get("/api/android/queue", function(req,res){
	data = queue.getQueue();
	output = "";
	for ( i = 0; i < data.length; i++ )
	{
		output += data[i].title+"\n";
	}
	res.send(output);
});

app.get("/api/android/nowplaying", function(req,res){
	q = queue.getDataForAPI();
	if ( q.length == 0 )
		res.send("Nothing Playing\n\n\n");
	else
		res.send(q[0].title+"\n"+q[0].artist+"\n"+q[0].album+"\n");
});

app.get("/api/play", function(req,res){
	queue.addToQueue(library.getSongByID(req.param("songID")));
	res.send("OK");
});


app.get("/api/queue", function(req,res){
	res.json(queue.getDataForAPI());
});

app.get("/api/nowplaying", function(req,res){
	q = queue.getDataForAPI();
	if ( q.length == 0 )
		res.json({});
	else
		res.json(queue.getQueue()[0]);
});

app.get("/api/skip", function(req,res){
	queue.skip();
	res.send("OK");
});

app.get("/api/pause", function(req,res){
	queue.skip();
	res.send("OK");
});


queue.setChangeCallback(function() 
{
	io.sockets.emit("queueChanged", queue.getDataForAPI());
});



library.init(function()
{
	console.log("Library ready!");
	server.listen(config.config.httpPort);
});


io.sockets.on('connection', function (socket) {
	socket.emit("resync", {library:library.getLibrary(), queue:queue.getQueue(), shuffle:queue.isShuffled()});
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
	socket.on("shuffle", function(state)
	{
		socket.broadcast.emit("shuffle", state);
		queue.setShuffle(state);
	});
});
