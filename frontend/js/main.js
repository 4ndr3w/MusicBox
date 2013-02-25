var musicQueue = new Array();
var musicList = new Array();
var socket = io.connect();
	
function init()
{
	if (document.location.hash == "" || document.location.hash == "#")
	    document.location.hash = "#library";
	$("#librarySearch").bind("propertychange keyup input paste", function()
	{
		buildLibrary($(this).val());
			
	});
}

	
function queue(id)
{
	for ( i = 0; i < musicQueue.length; i++ )
	{
		if ( musicQueue[i].id == id )
		{
			alert("\""+musicQueue[i].title+"\" is already in the queue.");
			return;
		}
	}
	thisSong = musicList[id];
	socket.emit("addToQueue", id);
}
	
function Song(song, par, style){
	this.row = createElement('tr',{'class':style});
	this.title = createElement('td', null, song.title);
	this.album = createElement('td', null, song.album);
	this.artist = createElement('td', null, song.artist);
	this.id = song.id;
	this.parent = par;
		
	this.build = function(que){
		if(que){
			this.row = createElement('tr',{'class':style, 'ondblclick':"queue(" + this.id + ")"});
				
			insertElementAt(this.title, this.row);
			insertElementAt(this.album, this.row);
			insertElementAt(this.artist, this.row);
			insertElementAt(createElement('td', null, null,createElement('button',{'onclick':"queue(" + this.id + ")",'style':'width:60%;'},'Add')), this.row);
			insertElementAt(this.row, this.parent);
			return;
		}
			
		insertElementAt(this.title, this.row);
		insertElementAt(this.album, this.row);
		insertElementAt(this.artist, this.row);
		insertElementAt(this.row, this.parent);
	}
}

function buildLibrary(matches){
	removeElement(document.getElementById('libraryTable'));
	insertElementAt(createElement('table', {'id':'libraryTable'}), document.getElementById('library'));
		
	matches = matches.toLowerCase();
		
	var header = createElement('tr');
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Title'), header);
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Album'), header);
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Artist'), header);
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Add'), header);
	insertElementAt(header, document.getElementById('libraryTable'));
	numMatched = 0;
	for ( i = 0; i < musicList.length; i++ ){
			
		thisSong = musicList[i];
			
		if ( matches != undefined && matches.trim() != "" ){
			if ( thisSong.title.toLowerCase().search(matches) != -1 || thisSong.artist.toLowerCase().search(matches) != -1 || thisSong.album.toLowerCase().search(matches)!= -1 ){
				colorClass = ((numMatched%2)==0?"rowA":"rowB");
				var row = new Song(thisSong, document.getElementById('libraryTable'), colorClass);
					
				row.build(true);
				numMatched++;
			}
		}
		else{
			removeElement(header);
			insertElementAt(createElement('div', null, 'Use the search bar to find music in the library'), document.getElementById('libraryTable'));
			return;
		}
	}
}
	
function buildQueue(queue){
	removeElement(document.getElementById('queueTable'));
	insertElementAt(createElement('table', {'id':'queueTable'}), document.getElementById('queue'));
		
	var header = createElement('tr');
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Title'), header);
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Album'), header);
	insertElementAt(createElement('td', {'class':'columnHeader'}, 'Artist'), header);
	insertElementAt(header, document.getElementById('queueTable'));
		
	musicQueue = queue;
	if ( queue.length != 0 ){
		updateElementContent(document.getElementById('statusBarNowPlaying'), "Now Playing: "+queue[0].title+" by "+queue[0].artist);
		setElement(document.getElementById('statusBarControls'), {'style':'inline;'});
	}
	else{
		updateElementContent(document.getElementById('statusBarNowPlaying'), 'Nothing Playing');
		setElement(document.getElementById('statusBarControls'), {'style':'none;'});
	}
		
	if ( queue.length <= 1 )
	{
		updateElementContent(document.getElementById("queueTable"), 'Queue Empty');
		return;
	}
		
	for ( i=1; i < queue.length; i++ )
	{
		colorClass = ((i%2)==1?"rowA":"rowB");
		thisSong = queue[i];
		row = new Song(thisSong, document.getElementById('queueTable'), colorClass);
		row.build(false);
	}
}
	
function skip()
{
	socket.emit("skip");
}
	
function pause()
{
	socket.emit("pause");
}
	
function setShuffle()
{
	socket.emit("shuffle", document.getElementById("shufflebox").checked);
}
	
socket.on("shuffle", function(data)
{
	document.getElementById("shufflebox").checked = data;
});
	
socket.on("resync", function(data)
{
	musicList = data.library;
	buildLibrary("");
	buildQueue(data.queue);
	document.getElementById("shufflebox").checked = data.shuffle;
});
	
socket.on("queueChanged", function(data)
{
	buildQueue(data);
});
	
socket.on('disconnect', function()
{
	updateElementContent(document.getElementById('statusBarNowPlaying'), "Disconnected from server");
});
	