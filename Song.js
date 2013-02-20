var fs = require('fs'),
	library = require("./Library");

function Song(id, title, album, artist, path)
{
	this.id = id;
	this.title = title.trim();
	this.artist = artist.trim();
	this.album = album.trim();
	this.path = path;

	this.getID = function()
	{
		return this.id;
	}

	this.getTitle = function()
	{
		if ( this.title == "" )
			return "Unknown";
		return this.title;
	}
	
	this.getArtist = function()
	{
		if ( this.artist == "")
			return "Unknown";
		return this.artist;
	}
	
	this.getAlbum = function()
	{
		if ( this.album == "" )
			return "Unknown";
		return this.album;
	}
	
	this.getPath = function()
	{
		return this.path;
	}
	
	this.getDataForAPI = function()
	{
		return {id:this.getID(), title:this.getTitle(), artist:this.getArtist(), album:this.getAlbum()};
	}
	
	this.toString = function()
	{
		return this.getTitle()+" - "+this.getAlbum()+" - "+this.getArtist();
	}
}

exports.process = Song;	