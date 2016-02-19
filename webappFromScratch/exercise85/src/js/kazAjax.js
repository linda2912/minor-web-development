//The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
export function request(method, href, async) {
  return new Promise((resolve, reject) => {
    var xmlhttp;
    //IE7+, Firefox, Chrome, Opera, Safari
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    //IE5, IE6
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.open(method, href, async);
    xmlhttp.onloadend = resolve;
    xmlhttp.onerror = reject;
    xmlhttp.send();
  });
}