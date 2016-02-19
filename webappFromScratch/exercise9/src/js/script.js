import _ from './lodash.js';
import * as kazUtils from './kazUtils.js';
import * as kazAjax from './kazAjax.js';
import * as kazRoute from './kazRoute.js';
import * as kazTemplate from './kazTemplate.js';

var contentContainer;
var questions = {};

var kazStart = {
  init: function() {
    this.cacheVars();
    this.initRoutes();
    this.addEvents();
    this.setStartSettings();
  },
  cacheVars: function() {
    contentContainer = kazUtils.getDocumentElement('#contentContainer');
    loader = kazUtils.getDocumentElement('.loader'); 
  },
  addEvents: function() {
    kazUtils.addEvent(window, 'hashchange', function(evt) {
      kazRoute.go(evt.newURL.split('#')[1]);
    });
  },
  initRoutes: function() {
    kazRoute.create('home', controllers['home']);
    kazRoute.create('question/{input}', controllers['question/{input}']);
  },
  setStartSettings: function() {
    this.setStartLocation('home');
  },
  setStartLocation: function(location) {
    window.location.hash = location;
    kazRoute.go(location);
  }
};

var controllers = {
  home: function() {
    kazAjax.request('get', 'http://api.imgflip.com/get_memes', true)
      .then((response) => {
        response = JSON.parse(response);
        return kazUtils.getRandomArrayItem(response.data.memes);
      })
      .then((response) => {
        return kazTemplate.init({container: '#contentContainer', template: 'home.html', data: response});
      })
      .then((response) => {
        kazUtils.addEvent(kazUtils.getDocumentElement('.searchButton'), 'click', (evt) => {
          window.location.hash = 'question/' + kazUtils.getDocumentElement('.searchField').value;
        });
      })
      .catch((err) => {
        console.error(err.stack);
      });
  },
  'question/{input}': function() {
    kazAjax.request('get', 'http://yesno.wtf/api/', true)
      .then((response) => {
        if(questions[this.parameters.input]) return questions[this.parameters.input];
        else {
          response = JSON.parse(response);
          response.question = this.parameters.input;
          questions[this.parameters.input] = response;
          return response;
        } 
      })
      .then((response) => {
        return kazTemplate.init({container: '#contentContainer', template: 'question.html', data: response});
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }
}

kazStart.init();


