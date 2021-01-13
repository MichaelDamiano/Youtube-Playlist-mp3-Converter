 var port = chrome.extension.connect({name: "download"});
 var interval;
 port.postMessage("url");
 
 port.onMessage.addListener(function(msg) {
   document.getElementById('input').value = msg;
   document.getElementById('submit').click();
   interval = setInterval(download, 1000);
});

function download(){
    try{
        if (document.getElementById('title').innerHTML.trim() != 'Please insert a valid video URL')
        {
            clearInterval(interval);
            document.getElementById('buttons').children[0].click();
        }
    }
   catch(err) {
        clearInterval(interval);
        port.postMessage("error");
   }
   finally{
        port.postMessage("done");
        setTimeout(function(){ close(); }, 1000);
    }
}
