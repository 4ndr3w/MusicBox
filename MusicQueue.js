var queue = new Array();
var queueChangeCallback = null;
var player = require("./MusicPlayer");
var nowPlaying = null;
var shuffle = false;
var library = require("./Library");

function setChangeCallback(callback)
{
	queueChangeCallback = callback;
}

function queueChanged()
{
	if ( queue.length != 0 && nowPlaying != queue[0].id )
	{
		nowPlaying = queue[0].id;
		console.log("Playing "+queue[0].path);
		player.playFile(queue[0].path, function(){
			advance();
		});
	}
	if ( queue.length == 0 && shuffle )
	{
		addToQueue(library.getRandomSong());
	}
	if ( queueChangeCallback != null )
		queueChangeCallback();
}


function addToQueue(song)
{
	queue.push(song);
	queueChanged();
}
	
function getCurrentSong()
{
	if ( this.queue.length == 0 )
		return null;
	return this.queue[0];
}
	
function getNextSong()
{
	if ( this.queue.length == 0 )
		return null;
	return this.queue[0];
}
	
function advance()
{
	advanceTo(1);
}

function advanceTo(songNum)
{
	for ( var i = 0; i < songNum; i++ )
		queue.shift();
	queueChanged();
}

function getQueue()
{
	return queue;
}

function getSendable()
{
	output = new Array();
	for ( var i = 0; i<queue.length; i++ )
	{
		output.push(queue[i].getDataForAPI());
	}
	return output;
}

function skip()
{
	player.skip();
}

function pause()
{
	player.pause();
}

function setShuffle(state)
{
	shuffle = state;
	if ( shuffle && queue.length == 0 )
	{
		addToQueue(library.getRandomSong());
	}
}

function isShuffled()
{
	return shuffle;
}

exports.setChangeCallback = setChangeCallback;
exports.addToQueue = addToQueue;
exports.getCurrentSong = getCurrentSong;
exports.getNextSong = getNextSong;
exports.getQueue = getQueue;
exports.getSendable = getSendable;
exports.skip = skip;
exports.pause = pause;
exports.setShuffle = setShuffle;
exports.isShuffled = isShuffled;