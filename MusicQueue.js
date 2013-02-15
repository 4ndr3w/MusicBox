function MusicQueue()
{
	this.queue = new Array();
	this.addToQueue = function(song)
	{
		this.queue.push(song);
	}
	
	this.getCurrentSong = function()
	{
		return this.queue[0];
	}
	
	this.getNextSong = function()
	{
		return this.queue[0];
	}
	
	this.advance = function()
	{
		this.advanceTo(1);
	}
	
	this.advanceTo = function(songNum)
	{
		for ( var i = 0; i < songNum; i++ )
			this.queue.shift();
	}
	
	this.getQueue = function()
	{
		return this.queue;
	}
}

exports.MusicQueue = MusicQueue;