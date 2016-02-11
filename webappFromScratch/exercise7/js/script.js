(function() {
  'use strict';
  var contentContainer;

  var kzStart = {
    init: function() {
      this.cacheVars();
      this.addEvents();
      this.createRoutes();
    },
    cacheVars: function() {
      contentContainer = document.getElementById('contentContainer');
    },
    addEvents: function() {
      utils.addEvent(window, 'hashchange', function(evt) {
        kazRoute.go(evt.newURL.split('#')[1]);
      });
    },
    createRoutes: function() {
      kazRoute.create('home', function(){console.log(this);});
      kazRoute.create('bestpractices', function(){console.log(this)});
      kazRoute.create('bestpractices/{user}', function(){console.log(this)});
    }
  };

  //The Facade Pattern - a pattern that hides the real complexity.
  var utils = {
    //addEventListener with cross-browser compatibility
    addEvent: function(el, ev, fn) {
      if(el.addEventListener ) el.addEventListener(ev, fn, false);
      else if(el.attachEvent) el.attachEvent( "on" + ev, fn);
      else el["on" + ev] = fn;
    }
  };

  kzStart.init();
}())


