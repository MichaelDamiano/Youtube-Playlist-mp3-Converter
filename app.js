//Creating a map of the playlist videos with the keys being the titles of the videos and the values being the URLs of the videos
var videoList = new Map();
let jsonObject = {};
var port = chrome.extension.connect({name: "youtube"});
var playlistURLS = document.querySelectorAll('a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
var playlistTitles = document.querySelectorAll('span#video-title.style-scope.ytd-playlist-video-renderer');
for (var i = 0; i < playlistURLS.length; i++)
{
    videoList.set(playlistTitles[i].title, playlistURLS[i].href);
}   
//converting map into JSON to send to background.js
videoList.forEach((value, key) => {  
    jsonObject[key] = value;  
});  

port.postMessage(JSON.stringify(jsonObject));
