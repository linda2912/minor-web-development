//The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
function addEvent(el, ev, fn) {
  if (el.addEventListener) el.addEventListener(ev, fn, false);else if (el.attachEvent) el.attachEvent("on" + ev, fn);else el["on" + ev] = fn;
}

//The Facade Pattern - a pattern that hides the real complexity. addEventListener with cross-browser compatibility
function request(method, href, async, callbackObj) {
  var xmlhttp;
  //IE7+, Firefox, Chrome, Opera, Safari
  if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
  //IE5, IE6
  else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  xmlhttp.open(method, href, async);
  if (callbackObj.start) xmlhttp.onloadstart = callbackObj.start;
  if (callbackObj.complete) xmlhttp.onloadend = callbackObj.complete;
  if (callbackObj.error) xmlhttp.onerror = callbackObj.error;
  if (callbackObj.abort) xmlhttp.onabort = callbackObj.abort;
  xmlhttp.send();
}

kazRoute = function () {
  //an array with all the created routes
  var routes = [];

  //a function to push a new route in to the routes array
  function create(routeName, fn) {
    routes.push(new Route(routeName, fn));
  }

  //a function that controles if user can go to that route
  function go(incomingRoute) {
    //loop through the routes and return the route that matches the incoming route
    var route = _.find(routes, function (route) {
      return match(route, incomingRoute);
    });

    //TODO: make an 404 error template thingy
    if (!route) return console.error('bad hash: ' + incomingRoute);

    //fire the callback function of the matched route
    route.callback.apply(route);
  }

  //function that checks if the route and the incoming route match
  function match(route, incomingRoute) {
    //create an array with the incoming route parts
    var incomingRouteArray = incomingRoute.split('/');

    //if the route array and the incoming route array aren't the same length deny the match
    if (!kazUtils.isSameArrayLength(route.routeParts, incomingRouteArray)) return false;

    //Loop through incoming route array and every return must be true
    return _.every(incomingRouteArray, function (incomingRoutePart, i) {
      //the routeParts are the samelength as incoming route array. Get the same height part
      var routePart = route.routeParts[i];

      if (typeof routePart === undefined) return false;

      if (!kazUtils.containsChars(routePart, ['{', '}'])) {
        if (!kazUtils.isSameObject(routePart, incomingRoutePart)) return false;
      }
      //if it is an dynamic part, create an parameter with the key of the route part and the key incoming route part
      else route.parameters[kazUtils.replaceFromString(routePart, ['{', '}'], '')] = incomingRoutePart;

      return true;
    });
  }

  //An Object that creates an route with an name and a callback
  var Route = function (routeName, callback) {
    this.callback = callback;
    this.routeParts = routeName.split('/');
    this.parameters = {};
  };

  //return the create and the go function so that people can't acces everything
  return {
    create: create,
    go: go
  };
}();

(function () {
  var contentContainer;

  var kazStart = {
    init: function () {
      this.cacheVars();
      this.addEvents();
      this.initRoutes();
      this.setStartLocation('home');
    },
    cacheVars: function () {
      contentContainer = document.getElementById('contentContainer');
    },
    addEvents: function () {
      addEvent(window, 'hashchange', function (evt) {
        undefined(evt.newURL.split('#')[1]);
      });
    },
    initRoutes: function () {
      undefined('home', controllers['home']);
      undefined('bestpractices', controllers['bestpractices']);
      undefined('bestpractices/{user}', controllers['bestpractices/{user}']);
    },
    setStartLocation: function (location) {
      window.location.hash = location;
      undefined(location);
    }
  };

  var controllers = {
    home: function () {
      var data = {
        name: 'Casper Boutens',
        age: 23,
        skills: ['ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef', 'ger', 'wefwef']
      };
      request('get', '../templates/home.html', true, {
        complete: function (response) {
          kazTemplate.init('#contentContainer', response.currentTarget.response, data);
        }
      });
    },
    bestpractices: function () {
      console.log(this);
    },
    'bestpractices/{user}': function () {
      var data = {
        name: this.parameters.user,
        age: 29
      };

      request('get', '../templates/home.html', true, {
        complete: function (response) {
          kazTemplate.init('#contentContainer', response.currentTarget.response, data);
        }
      });
    }
  };

  kazStart.init();
})();