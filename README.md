# Ember-authenticate-me

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

Add the following to your `app/router.js`:
````js
...

import AddRoutes from 'ember-authenticate-me/add-routes';

...

Router.map(function() {
  AddRoutes(this);
});

...
````


## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
