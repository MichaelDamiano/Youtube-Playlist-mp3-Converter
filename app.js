var playlistIDs = [];

var port = chrome.extension.connect({name: "youtube"});
var videos = document.querySelectorAll('ytd-playlist-video-renderer');
    
for (var i = 0; i < videos.length; i++)
{
    playlistIDs.push(videos[i].children[1].children[0].href);
}   

port.postMessage(playlistIDs);
