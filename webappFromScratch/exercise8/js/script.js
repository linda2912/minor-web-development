(function() {
  'use strict';
  var contentContainer;

  var kazStart = {
    init: function() {
      this.cacheVars();
      this.addEvents();
      this.initRoutes();
      this.setStartLocation('home');
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
    },
    setStartLocation: function(location) {
      window.location.hash = location;
      kazRoute.go(location);
    }
  };

  var controllers = {
    home: function() {
      var data = {
        name: 'Casper Boutens',
        age: 23,
        skills: ['ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef']
      }
      kazAjax.call('get', '../templates/home.html', true, {
        complete: function(response) {
          kazTemplate.init('#contentContainer', response.currentTarget.response, data);
        }
      });
    },
    bestpractices: function() {
      console.log(this);
    },
    'bestpractices/{user}': function() {
      var data = {
        name: 'Henk Jan',
        age: 29
      }

      kazAjax.call('get', '../templates/home.html', true, {
        complete: function(response) {
          kazTemplate.init('#contentContainer', response.currentTarget.response, data);
        }
      });
    }
  }

  kazStart.init();
}())


