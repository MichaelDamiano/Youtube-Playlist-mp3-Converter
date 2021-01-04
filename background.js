var videoLinks = [];
var videoCount = 0;
var url;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "/app.js"});
});

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
          if (msg == "url")
          { 
              port.postMessage(videoLinks[videoCount]);
              videoCount++;
          }
          else
          {
            if (port.name == "youtube"){ videoLinks = msg;}
            if (videoCount < videoLinks.length)
            {
                window.open('https://ytmp3.cc/');
                setTimeout(getTab, 3000);
            }
        }    
      });
 })




