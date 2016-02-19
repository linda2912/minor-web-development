import _ from './lodash.js';
import * as kazUtils from './kazUtils.js';
import * as kazAjax from './kazAjax.js';
import * as kazRoute from './kazRoute.js';
import * as kazTemplate from './kazTemplate.js';

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
    kazUtils.addEvent(document, 'touchstart', function(){});
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
    kazAjax.request('get', '../templates/home.html', true)
      .then(function(response) {
        kazTemplate.init({
          container: '#contentContainer', 
          template: response.currentTarget.response, 
          data: data
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  bestpractices: function() {
    console.log(this);
  },
  'bestpractices/{user}': function() {
    var data = {
      name: this.parameters.user,
      age: 29
    }

    kazAjax.request('get', '../templates/home.html', true)
      .then(function(response) {
        kazTemplate.init({
          container: '#contentContainer', 
          template: response.currentTarget.response, 
          data: data
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
}

kazStart.init();


