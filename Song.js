var fs = require('fs'),
    musicmetadata = require('musicmetadata');

function Song(path)
{
	this.metadata = null;
	
	var parser = new musicmetadata(fs.createReadStream(path));
	parser.on("metadata", function (result) {
		this.metadata = result;
	});
	
	this.getTitle = function()
	{
		return this.metadata.title;
	}
}

exports.process = Song;	