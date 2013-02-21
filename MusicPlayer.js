var childprocess = require("child_process");
var playerPath = "mplayer"


function playFile(path, callback)
{
	childprocess.exec(playerPath+" "+path, function(error, stdout, stderr) {
		callback();
	});
}

exports.playFile = playFile;