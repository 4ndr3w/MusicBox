var fs = require('fs')
var song = require("./Song");
var libraryPath = "";
var music = new Array();

function init(path)
{
	libraryPath = path;
	console.log(path);
	songs = fs.readdirSync(path);
	console.log(songs);
	for (var i = 0; i < songs.length; i++ )
	{
		music.push(new song.process(path+"/"+songs[i]));
	}	
}

function getLibrary()
{
	return music;
}


exports.init = init;
exports.getLibrary = getLibrary;
