import * as kazUtils from './kazUtils.js';

//module pattern
//an array with all the created routes
var routes = [];

//a function to push a new route in to the routes array
export function create(routeName, fn) {
  saveRoute({name: routeName, callback:fn});
  routes.push(new Route(routeName, fn));
}

//a function that pushes a new route in to localstorage
function saveRoute(newRoute) {
  //make the callback an string
  newRoute.callback = newRoute.callback.toString();
  //get the localstorage data of the route name
  return kazUtils.getLocalStorage(newRoute.name, function(localStorage) {
    //stringify the new Route
    return kazUtils.stringify(new Route(newRoute.name, newRoute.callback), function(stringified) {
      //if localStorage doesn't exist, set it in local storage
      if(kazUtils.truefy(localStorage)) kazUtils.setLocalStorage(newRoute.name, stringified);
      //if the localStorage data and the new route data don't match, overwrite the data
      else if(!Object.is(localStorage, stringified)) kazUtils.setLocalStorage(newRoute.name, stringified);
    });
  });
}

//a function that controles if user can go to that route
export function go(incomingRoute) {
  return kazUtils.getLocalStorage(incomingRoute, function(localStorage) {
    if(kazUtils.truefy(localStorage)) return addProperties(kazUtils.parse(localStorage), incomingRoute, function() {
      localStorage = kazUtils.parse(localStorage);
      return new Function(localStorage.callback.apply(localStorage));
    });
    return console.error('bad hash: ' + incomingRoute);
  });
  // //loop through the routes and return the route that matches the incoming route
  // var route = _.find(routes, function(route) {
  //   return match(route, incomingRoute);
  // });

  // //TODO: make an 404 error template thingy
  // if(!route) return console.error('bad hash: ' + incomingRoute);

  // //fire the callback function of the matched route
  // route.callback.apply(route);
}

//function that checks if the route and the incoming route match 
function addProperties(route, incomingRoute, callback) {
  //create an array with the incoming route parts
  var incomingRouteArray = incomingRoute.split('/');

  //if the route array and the incoming route array aren't the same length deny the match
  if(!kazUtils.isSameArrayLength(route.routeParts, incomingRouteArray)) return false;

  //Loop through incoming route array and every return must be true
  return _.every(incomingRouteArray, function(incomingRoutePart, i) {
    //the routeParts are the samelength as incoming route array. Get the same height part
    var routePart = route.routeParts[i];

    if(typeof routePart === undefined) return false;

    if(!kazUtils.containsChars(routePart, ['{', '}'])) {
      if(!kazUtils.isSameObject(routePart, incomingRoutePart)) return false;
    } 
    //if it is an dynamic part, create an parameter with the key of the route part and the key incoming route part
    else route.parameters[kazUtils.replaceFromString(routePart, ['{', '}'], '')] = incomingRoutePart;

    return callback();
  });
}

//An Object that creates an route with an name and a callback
var Route = function(routeName, callback) {
  this.callback = callback;
  this.routeParts = routeName.split('/');
  this.parameters = {};
};