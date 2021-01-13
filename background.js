let videoList = new Map;
var mapIter;
var currentVideo;
var errorMessage;
// start the application
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "/app.js"});
});
// makes the tab opened on ytmp3.cc the active tab and starts the download
function getTab() {
  chrome.tabs.query({}, function(tabs) {
    for (var i = 0; i < tabs.length; i++)
    {
        if(tabs[i].url.includes("ytmp3.cc"))
        {
            chrome.tabs.update(tabs[i].id, {selected: true});
            chrome.tabs.executeScript(null, {file: "/download.js"});
            break;
        }
    }
  });
}

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (port.name == "youtube")
        { 
            // convert the json of video titles/URLs into a map
            videoListJSON = JSON.parse(msg);
            for (var value in videoListJSON) {  
                videoList.set(value,videoListJSON[value]);  
            }  
            mapIter = videoList.entries();
            currentVideo = mapIter.next();
            window.open('https://ytmp3.cc/');
            setTimeout(getTab, 3000);
        }
        else
        {
            switch(msg) {
                case "url": // send url of current video in playlist
                    port.postMessage(currentVideo.value[1]);
                    break;
                case "error": // when a video fails to download
                    if(!errorMessage)
                    {
                        //begin the error message
                        errorMessage = "One or more videos have failed to download:";
                    }
                    errorMessage += "\n" + currentVideo.value[0] + " - " + currentVideo.value[1];
                    break;
                case "done": // check if for the next video. If all the videos have been successfully downloaded, send a success message. If not, send error message. 
                    currentVideo = mapIter.next();
                    if (!currentVideo.done)
                    {
                        window.open('https://ytmp3.cc/');
                        setTimeout(getTab, 3000);
                    }
                    else
                    {
                        if(errorMessage){alert(errorMessage + "\n\n This can be for a variety of reasons. Feel free to try again using my other extension: \"Youtube mp3 Converter\" for converting individual videos into mp3 files!");}
                        else{alert("All videos have been successfully converted");}
                    }
                    break;
            }
        }    
      });
 })



