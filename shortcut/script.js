(function(){
  var body = document.querySelector('body');
  var baseURL = location.href;
  console.log(location.href);
  var isMenu = false;
  var keysPressed = {};
  var templateString =
    "<div class='shortcutMenu'>" +
      "<div class='content'>" +
        "<div class='close'>" +
          "<p>X</p>" +
        "</div>" +
        "<h2>CSS to the rescue</h2>" +
        "<ul>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/cssToTheRescue/opdracht1/index.html'>Flexbox Baby</a></li>" +
        "</ul>" +
        "<h2>Webapp from Scratch</h2>" +
        "<ul>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/webappFromScratch/opdracht2/index.html'>Research the pro's and con's of libaries</a></li>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/webappFromScratch/opdracht3/index.html'>Research the pro's and con's of webapps</a></li>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/webappFromScratch/opdracht4/index.html'>Refactor bad code to slightly better code</a></li>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/webappFromScratch/opdracht5/index.html'>Start the webapp, begin with routing</a></li>" +
        "</ul>" +
        "<h2>Weekly Nerds</h2>" +
        "<ul>" +
          "<li><a href='http://kasszz.github.io/Minor-Web-Development/weeklyNerd/blog1/index.html'>Arjan Westerdiep (Drububu) - From pixelart to other cool things</a></li>" +
        "</ul>" +
      "</div>" +
    "</div>"
  window.addEventListener('keydown', function(evt) {
    keysPressed[evt.keyCode] = true;
  });

  window.addEventListener('keyup', function(evt) {
    //check if keys are pressed (ctrl + shift + 5)
    if(keysPressed[17] && keysPressed[16] && keysPressed[53] && !isMenu) {
      createMenu();
    }

    keysPressed[evt.keyCode] = false;
  });

  function createMenu() {
    isMenu = true;
    body.innerHTML += templateString;
    document.querySelector('.close').addEventListener('click', deleteMenu);
  }

  function deleteMenu() {
    document.querySelector('.close').removeEventListener('click', deleteMenu);
    document.querySelector('.shortcutMenu').remove();
    isMenu = false;
  }
}());