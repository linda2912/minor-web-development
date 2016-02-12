var kazAjax = {
  //The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
  call: function(method, href, async, callbackObj) {
    var xmlhttp;
    //IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    //IE5, IE6
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    
    xmlhttp.open(method, href, async);
    if(callbackObj.start) xmlhttp.onloadstart = callbackObj.start;
    if(callbackObj.complete) xmlhttp.onloadend = callbackObj.complete;
    if(callbackObj.error) xmlhttp.onerror = callbackObj.error;
    if(callbackObj.abort) xmlhttp.onabort = callbackObj.abort;
    xmlhttp.send();
  }
}