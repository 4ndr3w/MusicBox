var queue = new Array();
var queueChangeCallback = null;


function setChangeCallback(callback)
{
	queueChangeCallback = callback;
}

function queueChanged()
{
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

exports.setChangeCallback = setChangeCallback;
exports.addToQueue = addToQueue;
exports.getCurrentSong = getCurrentSong;
exports.getNextSong = getNextSong;
exports.advance = advance;
exports.advanceTo = advanceTo;
exports.getQueue = getQueue;
exports.getSendable = getSendable;