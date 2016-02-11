(function(){
  var body = document.querySelector('body');
  var baseURL = 'http://kasszz.github.io/minor-web-development';
  var isMenu = false;
  var keysPressed = {};
  var templateString =
    "<div class='shortcutMenu'>" +
      "<div class='content'>" +
        "<div class='menu'>" +
          "<a href=" + baseURL + ">Back to the hub</a>" +
          "<p>X</p>" +
        "</div>" +
        "<h2>CSS to the rescue</h2>" +
        "<ul>" +
          "<li><a href='" + baseURL + "/cssToTheRescue/exercise1/index.html'>Flexbox Baby</a></li>" +
          "<li><a href='" + baseURL + "/cssToTheRescue/exercise2/index.html'>Making a modal</a></li>" +
        "</ul>" +
        "<h2>Webapp from Scratch</h2>" +
        "<ul>" +
          "<li><a href='" + baseURL + "/webappFromScratch/exercise2/index.html'>Research the pro's and con's of libaries</a></li>" +
          "<li><a href='" + baseURL + "/webappFromScratch/exercise3/index.html'>Research the pro's and con's of webapps</a></li>" +
          "<li><a href='" + baseURL + "/webappFromScratch/exercise4/index.html'>Refactor bad code to slightly better code</a></li>" +
          "<li><a href='" + baseURL + "/webappFromScratch/exercise5/index.html'>Start the webapp, begin with routing</a></li>" +
          "<li><a href='" + baseURL + "/webappFromScratch/exercise7/index.html'>Creating my own routing</a></li>" +
        "</ul>" +
        "<h2>Weekly Nerds</h2>" +
        "<ul>" +
          "<li><a href='" + baseURL + "/weeklyNerd/blog1/index.html'>Arjan Westerdiep (Drububu) - From pixelart to other cool things</a></li>" +
          "<li><a href='" + baseURL + "/weeklyNerd/blog2/index.html'>Marrije Schaake - The power of real-life Photoshop</a></li>" +
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
    document.querySelector('.menu p').addEventListener('click', deleteMenu);
  }

  function deleteMenu() {
    document.querySelector('.menu p').removeEventListener('click', deleteMenu);
    document.querySelector('.shortcutMenu').remove();
    isMenu = false;
  }
}());