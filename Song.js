var fs = require('fs'),
    mm = require('musicmetadata'),
	library = require("./Library");

function Song(id, title, artist, album, path)
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
}

exports.process = Song;	