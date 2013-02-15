express = require("express");
socketio = require("socket.io")
app = express();
server = require("http").createServer(app);
io = socketio.listen(server)


app.use("/frontend", express.static("./frontend"));

app.get("/", function(req,res) {
	res.redirect("frontend/test.html");
});

server.listen(8080);