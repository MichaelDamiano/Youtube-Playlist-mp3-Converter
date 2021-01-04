 var port = chrome.extension.connect({name: "download"});
 var notStarted = true;
 port.postMessage("url");
 
 port.onMessage.addListener(function(msg) {
   document.getElementById('input').value = msg;
   document.getElementById('submit').click();
   setInterval(download, 1000);
});

function download(){
   if (document.getElementById('title').innerHTML.trim() != 'Please insert a valid video URL' && notStarted)
   {
       notStarted = false;
       document.getElementById('buttons').children[0].click();
       port.postMessage("");
       setTimeout(function(){ close(); }, 1000);
   }
}