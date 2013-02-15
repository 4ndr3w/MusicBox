var childprocess = require("child_process");

function MusicPlayer(mplayerPath)
{
	this.mplayerPath = mplayerPath;
	this.playFile = function(path, callback)
	{
		childprocess.exec(this.mplayerPath, function(error, stdout, stderr) {
			callback();
		});
	}
	return this;
}

exports.MusicPlayer = MusicPlayer;
