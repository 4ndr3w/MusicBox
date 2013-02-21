var childprocess = require("child_process");
var config = require("./config");

var mplayerPath = config.config.mplayerPath;
var currentlyPlaying = null;

function playFile(path, callback)
{
	if ( currentlyPlaying != null )
		return false;
	
	currentlyPlaying = childprocess.spawn(mplayerPath, new Array("-quiet", path), {env: process.env});
	
	currentlyPlaying.on("exit", function(exitCode) {
		currentlyPlaying = null;
		callback(exitCode);
	});
	
}

function skip()
{
	if ( currentlyPlaying == null )
		return false;
	currentlyPlaying.kill();
}

function pause()
{
	if ( currentlyPlaying == null )
	{
		return false;
	}
	currentlyPlaying.stdin.write(" ");
}

exports.playFile = playFile;
exports.skip = skip;
exports.pause = pause;