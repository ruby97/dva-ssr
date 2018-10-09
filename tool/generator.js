var fs = require("fs");
var ejs = require("ejs");
var path = require("path");
var routesFileName = path.resolve(__dirname, "../config/routes.json");

if (!fs.existsSync(routesFileName)) {
  console.log("routes.json file does not exist!");
  return;
}
var routeConfig = fs.readFileSync(routesFileName, 'utf8');

var routes = [];
try {
  routes = JSON.parse(routeConfig);
} catch (e) {
  console.log("parse routes.json file failed");
}


function getFilenameWithoutExtension(str, separator = "/") {
  var slices = str.split(separator);
  var filename = slices[slices.length - 1];
  slices = filename.split(".");
  if (slices.length > 1) {
    slices.pop();
  }
  return slices.join(".");
}

function validateRouteConfig(route) {
  if (!route || !route.dva_route || !route.path) {
    return false;
  }

  try {
    var routeClassName = getFilenameWithoutExtension(route.dva_route);
    var firstCharacter = routeClassName.charCodeAt(0);
    if ((firstCharacter - "A".charCodeAt(0) < 0 || firstCharacter - "Z".charCodeAt(0) > 0)) {
      return false;
    }

    var dict = {};
    var valid = true;
    if (route.dva_models) {
      for (var i = 0; i < route.dva_models.length; i++) {
        if (route.dva_models.hasOwnProperty(i)) {
          var m = route.dva_models[i];
          if (dict[m] === undefined) {
            dict[m] = true;
          } else {
            valid = false;
          }
        }
      }
    }
    return valid;
  } catch (e) {
    return false;
  }
}


function fillRouteConfig(route) {
  route.dva_route_name = getFilenameWithoutExtension(route.dva_route);
  route.dva_model_name_list = [];
  for (var i = 0; i < route.dva_models.length; i++) {
    if (route.dva_models.hasOwnProperty(i)) {
      route.dva_model_name_list.push(getFilenameWithoutExtension(route.dva_models[i]));
    }
  }
  return route;
}

var valid = true;
for (var i = 0; i < routes.length; i++) {
  if (routes.hasOwnProperty(i)) {
    valid = validateRouteConfig(routes[i]);
    if (!valid) {
      console.log("routes config error");
      break;
    }
  }
}

if (!valid) {
  return;
}

var tplComponent = fs.readFileSync(path.resolve(__dirname, 'tpl_component.ejs'), 'utf8');
var tplRoutes = fs.readFileSync(path.resolve(__dirname, './tpl_routes.ejs'), 'utf8');

for (var i = 0; i < routes.length; i++) {
  if (routes.hasOwnProperty(i)) {
    routes[i] = fillRouteConfig(routes[i]);
    routes[i].component = ejs.render(tplComponent, routes[i]);
  }
}

var template = ejs.render(tplRoutes, {routes: routes});
fs.writeFileSync(path.resolve(__dirname, '../src/routes.js'), template);
console.log("generator finished");


