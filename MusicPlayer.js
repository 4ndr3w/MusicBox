var childprocess = require("child_process");
var basePath = "/Applications/MPlayer OSX Extended.app/Contents/Resources/Binaries/mpextended.mpBinaries/Contents/mpextended.mpBinaries/Contents/MacOS/mplayer";
var currentlyPlaying = null;

function playFile(path, callback)
{
	if ( currentlyPlaying != null )
	{
		return false;
	}
	
	currentlyPlaying = childprocess.spawn(basePath, new Array("-quiet", path), {env: process.env});
	
	currentlyPlaying.on("exit", function(exitCode) {
		currentlyPlaying = null;
		callback(exitCode);
	});
	
}

exports.playFile = playFile;