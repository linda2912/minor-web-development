(function() {
  'use strict';
  var contentContainer;

  var kzStart = {
    init: function() {
      this.cacheVars();
      this.addEvents();
      this.initRoutes();
    },
    cacheVars: function() {
      contentContainer = document.getElementById('contentContainer');
    },
    addEvents: function() {
      kazUtils.addEvent(window, 'hashchange', function(evt) {
        kazRoute.go(evt.newURL.split('#')[1]);
      });
    },
    initRoutes: function() {
      kazRoute.create('home', controllers['home']);
      kazRoute.create('bestpractices', controllers['bestpractices']);
      kazRoute.create('bestpractices/{user}', controllers['bestpractices/{user}']);
    }
  };

  var controllers = {
    home: function() {
      console.log(this);
    },
    bestpractices: function() {
      console.log(this);
    },
    'bestpractices/{user}': function() {
      console.log(this);
    }
  }

  kzStart.init();
}())


