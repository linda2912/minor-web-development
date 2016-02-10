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
        router.go(evt.newURL.split('#')[1]);
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
      if(el.addEventListener ) el.addEventListener(ev, fn, false);
      else if(el.attachEvent) el.attachEvent( "on" + ev, fn);
      else el["on" + ev] = fn;
    }
  };

  var router = {
    routes: [],
    create: function(routeName, fn) {
      this.routes.push(new Route(routeName, fn));
    },
    go: function(incomingRoute) {
      var self = this;
      var routeFound = false;

      for(var x = 0; x < self.routes.length; x++) {
        var route = self.routes[x];
        if(self.match(route, incomingRoute)) {
          route.callback.apply(route);
          routeFound = true;
          break;
        }
      };

      if(!routeFound) console.error('bad hash: ' + incomingRoute);
    },
    match: function(route, incomingRoute) {
      var self = this;
      var incomingRouteArray = incomingRoute.split('/');

      if(!this.helper.isSameLength(route, incomingRouteArray)) return false;

      for(var x = 0; x < incomingRouteArray.length; x++){
        var routePart = route.routeParts[x];
        var incomingRoutePart = incomingRouteArray[x];

        if(typeof routePart === undefined) return false;

        if(!self.helper.isDynamicPart(routePart)) {
          if(!self.helper.isSame(routePart, incomingRoutePart)) return false;
        } else route.parameters[self.helper.removeDynamicPart(routePart)] = incomingRoutePart;
      };

      return true;
    },
    helper: {
      isDynamicPart: function(routeName) {
        return ((routeName.substring(0, 1) === '{' && routeName.substring(routeName.length -1) === '}') ? true : false);
      },
      isSameLength: function(route, incomingRouteArray) {
        return (route.routeParts.length === incomingRouteArray.length);
      },
      isSame: function(routePart, incomingRoutePart) {
        return ((routePart === incomingRoutePart) ? true : false);
      },
      removeDynamicPart: function(routePart) {
        return routePart.replace('{', '').replace('}', '');
      }
    }
  };

  var Route = function(routeName, callback) {
    var self = this;
    self.callback = callback;
    self.routeParts = routeName.split('/');
    self.parameters = {};
  };

  kzStart.init();
}())


