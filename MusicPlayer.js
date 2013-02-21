var childprocess = require("child_process");

// Use this if mplayer is in your PATH
// var mPlayerPath = "mplayer"

// OS X mplayer
var mPlayerPath = "/Applications/MPlayer OSX Extended.app/Contents/Resources/Binaries/mpextended.mpBinaries/Contents/mpextended.mpBinaries/Contents/MacOS/mplayer";
var currentlyPlaying = null;

function playFile(path, callback)
{
	if ( currentlyPlaying != null )
	{
		return false;
	}
	
	currentlyPlaying = childprocess.spawn(mPlayerPath, new Array("-quiet", path), {env: process.env});
	
	currentlyPlaying.on("exit", function(exitCode) {
		currentlyPlaying = null;
		callback(exitCode);
	});
	
}

exports.playFile = playFile;