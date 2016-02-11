//module pattern
var kazRoute = (function(){
  //an array with all the created routes
  var routes = [];

  //a function to push a new route in to the routes array
  function create(routeName, fn) {
    routes.push(new Route(routeName, fn));
  }

  //a function that controles if user can go to that route
  function go(incomingRoute) {
    //loop through the routes and return the route that matches the incoming route
    var route = _.find(routes, function(route) {
      return match(route, incomingRoute);
    });

    if(!route) return console.error('bad hash: ' + incomingRoute);
    
    //fire the callback function of the matched route
    route.callback.apply(route);
  }

  //function that checks if the route and the incoming route match 
  function match(route, incomingRoute) {
    //create an array with the incoming route parts
    var incomingRouteArray = incomingRoute.split('/');

    //if the route array and the incoming route array aren't the same length deny the match
    if(!utils.isSameArrayLength(route, incomingRouteArray)) return false;

    //Loop through incoming route array and every return must be true
    return _.every(incomingRouteArray, function(incomingRoutePart, i) {
      //the routeParts are the samelength as incoming route array. Get the same height part
      var routePart = route.routeParts[i];

      if(typeof routePart === undefined) return false;

      if(!utils.isDynamicPart(routePart)) {
        if(!utils.isSameObject(routePart, incomingRoutePart)) return false;
      } 
      //if it is an dynamic part, create an parameter with the key of the route part and the key incoming route part
      else route.parameters[utils.removeDynamicPart(routePart)] = incomingRoutePart;

      return true;
    });
  }

  utils = {
    //the routepart is dynamic if there is an { } in it
    isDynamicPart: function(routePart) {
      return ((routePart.substring(0, 1) === '{' && routePart.substring(routePart.length -1) === '}') ? true : false);
    },
    //check if the arrays are the same length
    isSameArrayLength: function(route, incomingRouteArray) {
      return (route.routeParts.length === incomingRouteArray.length);
    },
    //check if the objects are the same
    isSameObject: function(routePart, incomingRoutePart) {
      return ((routePart === incomingRoutePart) ? true : false);
    },
    //remove the { } from an dynamicpart
    removeDynamicPart: function(routePart) {
      return routePart.replace('{', '').replace('}', '');
    }
  }

  //An Object that creates an route with an name and a callback
  var Route = function(routeName, callback) {
    this.callback = callback;
    this.routeParts = routeName.split('/');
    this.parameters = {};
  };

  //return the create and the go function so that people can't acces everything
  return {
    create: create,
    go: go
  }

}());