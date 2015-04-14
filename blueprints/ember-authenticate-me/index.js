/*jshint node:true*/

var fs                   = require('fs');
var path                 = require('path');
var EmberRouterGenerator = require('ember-router-generator');

module.exports = {
  afterInstall: function(options) {
    var rootPath = options.project.root;
    
    addRouteToRouter('login', rootPath, {});
    addRouteToRouter('logout', rootPath, {});
    addRouteToRouter('sign-up', rootPath, {});
    addRouteToRouter('forgot-password', rootPath, {});
    addRouteToRouter('reset-password', rootPath, { path: '/reset-password/:token'});
    addRouteToRouter('edit-account', rootPath, { path: '/edit-account/:user_id' });
  },

  normalizeEntityName: function() {}
};

function addRouteToRouter(name, root, options) {
  var routerPath = path.join(root, 'app', 'router.js');
  var source = fs.readFileSync(routerPath, 'utf-8');

  var routes = new EmberRouterGenerator(source);
  var newRoutes = routes.add(name, options);

  fs.writeFileSync(routerPath, newRoutes.code());
}
