(function() {
  'use strict';

  var contentContainer;
  var routes = [];

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
        router.goTo(evt.newURL.split('#')[1]);
      });
    },
    createRoutes: function() {
      router.create('home', function(){console.log(this);});
      router.create('bestpractices', function(){console.log(this)});
      router.create('bestpractices/{user}', function(){console.log(this)});
    }
  };

  //The Facade Pattern - a pattern that hides the real complexity.
  var utils = {
    //addEventListener with cross-browser compatibility
    addEvent: function(el, ev, fn) {
      if( el.addEventListener ) el.addEventListener( ev, fn, false);
      else if(el.attachEvent) el.attachEvent( "on" + ev, fn);
      else el["on" + ev] = fn;
    }
  };

  var router = {
    create: function(routeName, fn) {
      routes.push(new Route(routeName, fn));
    },
    goTo: function(newRouteName) {
      var correctRoute;

      routes.forEach(function(route) {
        if(route.test.call(route, newRouteName)) correctRoute = route;
      });

      if(correctRoute) correctRoute.callback.apply(correctRoute);
      else console.error('bad hash: ' + newRouteName);
    }
  };

  var Route = function(routeName, callback) {
    var self = this;
    self.callback = callback;
    self.routeNameParts = routeName.split('/');
    self.dynamicRoutes = [];
    self.parameters = {};

    self.routeNameParts.forEach(function(part) {
      if(part.substring(0, 1) === '{' && part.substring(part.length -1) === '}') {
        self.dynamicRoutes.push(part.replace('{', '').replace('}', ''));
      }
    });
  };

  Route.prototype.test = function(newRouteName) {
    var self = this;
    var newRouteNameParts = newRouteName.split('/');

    if(newRouteNameParts.length !== self.routeNameParts.length) return false;

    for(var x = 0; x < newRouteNameParts.length; x ++) {
      var part = self.routeNameParts[x];
      if(typeof part === undefined) return false; 
      if(part.substring(0, 1) !== '{' && part.substring(part.length -1) !== '}') {
        if(part !== newRouteNameParts[x]) return false;
      } else self.parameters[part.replace('{', '').replace('}', '')] = newRouteNameParts[x];
    };

    return true;
  }

  kzStart.init();
}())


