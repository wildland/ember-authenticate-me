# Ember-authenticate-me

This addon hooks torii up to work out of the box with the Rails gem [token-authenticate-me](https://github.com/inigo-llc/token_authenticate_me) and includes some default templates, routes, and controllers.

## Installation

* `npm install --save-dev ember-authenticate-me`
* `ember g ember-authenticate-me`
* `ember g user`

app/router.js:
````js

import Ember from 'ember';
import config from './config/environment';
import addRoutes from 'ember-authenticate-me/add-routes';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  ...
  addRoutes(this);
});

export default Router;


````

## TODO:
 - [ ] Automatically inject addRoutes into the router in generator.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
