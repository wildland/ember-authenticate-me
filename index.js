'use strict';

module.exports = {
  name: 'ember-authenticate-me',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/css/authentication.css');
  }
};
