var fs = require('fs')
var song = require("./Song");
var config = require("./config");
var libraryPath = "";
var music = new Array();

function init(readyCallback)
{
	libraryPath = config.config.libraryPath;
	
	fs.readFile(libraryPath, function (err, data) {
		if ( !err )
		{
			list = data.toString().trim().split("\n");
			for ( i = 0; i < list.length; i++ )
			{
				thisSong = list[i].split(",");
				music.push(new song.process(i, thisSong[0], thisSong[1], thisSong[2], thisSong[3]));
			}
			if ( readyCallback != null )
				readyCallback();
		}
		else
			console.log("Failed to load library at "+libraryPath);
	});
}


function getSongByID(id)
{
	return music[id];
}

function getLibrary()
{
	var output = [];
	for ( i = 0; i < music.length; i++  )
		output.push(music[i].getDataForAPI());
	return output;
}

function getRandomSong()
{
	return music[Math.floor(Math.random()*music.length)];
}


exports.init = init;
exports.getLibrary = getLibrary;
exports.getSongByID = getSongByID;
exports.getRandomSong = getRandomSong;
