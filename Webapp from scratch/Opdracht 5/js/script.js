(function() {
  'use strict';

  var app = {
    init: function() {
      routes.init();
    }
  };

  var routes = {
    init: function() {
      utils.addEvent(window, 'hashchange', function(evt){
        sections.changeRoute(evt.newURL.split('#')[1]);
      });
    }
  };

  var sections = {
    changeRoute: function(route) {
      console.log(route);
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
    }
  };

  app.init();
}())