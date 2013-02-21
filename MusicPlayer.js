var childprocess = require("child_process");
var config = require("./config");

var mplayerPath = config.config.mplayerPath;
var currentlyPlaying = null;

function playFile(path, callback)
{
	if ( currentlyPlaying != null )
	{
		return false;
	}
	
	currentlyPlaying = childprocess.spawn(mplayerPath, new Array("-quiet", path), {env: process.env});
	
	currentlyPlaying.on("exit", function(exitCode) {
		currentlyPlaying = null;
		callback(exitCode);
	});
	
}

exports.playFile = playFile;