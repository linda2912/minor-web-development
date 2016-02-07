(function() {
  'use strict';

  var contentContainer;

  var app = {
    init: function() {
      this.populateGlobalScopeVars();
      routes.init();
    },
    populateGlobalScopeVars: function() {
      contentContainer = document.getElementById('contentContainer');
    }
  };

  var routes = {
    init: function() {
      utils.setHash('home');

      utils.addEvent(window, 'hashchange', function(evt){
        sections.changeRoute({oldHash: evt.oldURL.split('#')[1], newHash: evt.newURL.split('#')[1]});
      });
    }
  };

  var sections = {
    changeRoute: function(routes) {
      if(utils.templateCheck(routes.newHash)) contentContainer.innerHTML = templates[routes.newHash];
      else console.error('BAD HASH: ' + routes.newHash);
    }
  };

  //The Facade Pattern - a pattern that hides the real complexity.
  var utils = {
    //addEventListener with cross-browser compatibility
    addEvent: function(el, ev, fn) {
      if( el.addEventListener ) {
        el.addEventListener( ev, fn, false);
      } else if(el.attachEvent) {
        el.attachEvent( "on" + ev, fn);
      } else {
        el["on" + ev] = fn;
      }
    },
    //check if the template exists
    templateCheck: function(templateName) {
      if(templates[templateName]) return true;
      else return false;
    },
    setHash: function(hash) {
      window.location.hash = '#' + hash;
      sections.changeRoute({oldHash: undefined, newHash: hash});
    }
  };

  app.init();
}())
