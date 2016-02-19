import _ from './lodash.js';
import hammer from './hammer.min.js';
import shake from './shake.js';
import * as kazUtils from './kazUtils.js';
import * as kazAjax from './kazAjax.js';
import * as kazRoute from './kazRoute.js';
import * as kazTemplate from './kazTemplate.js';

var contentContainer;
var questions = {};
var randomQuestions = [
  {answer:'yes',forced: false,image: 'http://yesno.wtf/assets/yes/8-2f93962e2ab24427df8589131da01a4d.gif', question: 'Is de wereld rond?'},
  {answer:'yes',forced: false,image: 'http://yesno.wtf/assets/yes/5-64c2804cc48057b94fd0b3eaf323d92c.gif', question: 'Drink je genoeg water?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/7-331da2464250a1459cd7d41715e1f67d.gif', question: 'Heb je al gegeten?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/11-e6b930256265890554c1464973ebba55.gif', question: 'Heeft het leven zin?'},
  {answer:'yes',forced: false,image: 'http://yesno.wtf/assets/yes/14-b57c6dc03aa15a4b18f53eb50d6197ee.gif', question: 'Is Joost de beste leraar?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/15-7446b1035f784986609f456e15d30a5b.gif', question: 'Mogen er tosties worden gemaakt in de N-lounge?'},
  {answer:'yes',forced: false,image: 'http://yesno.wtf/assets/yes/4-c53643ecec77153eefb461e053fb4947.gif', question: 'Is 6 / 2(1+2) = 9?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/15-7446b1035f784986609f456e15d30a5b.gif', question: 'Zijn katten beter dan honden?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/9-dc99c0e3c066b28d3a12262692cd5432.gif', question: 'Is engerydrink goed voor je?'},
  {answer:'no',forced: false,image: 'http://yesno.wtf/assets/no/28-e19b6f658f621f7c5980a33f8249a65d.gif', question: 'if(null) return yes?'},
];

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
    kazRoute.create('question/random', controllers['question/random']);
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
      .then((response) => {
        var mc = new Hammer(kazUtils.getDocumentElement('.background'));
        mc.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 10}));
        mc.on("panright", (ev) => {
          if(ev.isFinal) window.location.hash = 'home';
        });

        var myShakeEvent = new Shake({threshold: 10,timeout: 1000});
        myShakeEvent.start();
        kazUtils.addEvent(window, 'shake', () => {
          window.location.hash = 'question/random';
        });

      })
      .catch((err) => {
        console.error(err.stack);
      });
  },
  'question/random': function() {
    kazTemplate.init({container: '#contentContainer', template: 'question.html', data: kazUtils.getRandomArrayItem(randomQuestions)})
      .then((response) => {
        var mc = new Hammer(kazUtils.getDocumentElement('.background'));
        mc.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 10}));
        mc.on("panright", (ev) => {
          if(ev.isFinal) window.location.hash = 'home';
        });

        var myShakeEvent = new Shake({threshold: 10,timeout: 1000});
        myShakeEvent.start();
        kazUtils.addEvent(window, 'shake', () => {
          window.location.hash = 'question/random';
        });

      })
      .catch((err) => {
        console.error(err.stack);
      });
  }
}

kazStart.init();


