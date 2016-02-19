//The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
export function request (method, href, async) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    'use strict';
    let xmlhttp;
    //IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    //IE5, IE6
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    
    xmlhttp.open(method, href, async);

    xmlhttp.onload = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) return resolve(xmlhttp.response);
      else return reject(xmlhttp.statusText);
    };

    xmlhttp.onerror = function() {
      return reject('Network Error');
    };

    xmlhttp.send();
  });
}