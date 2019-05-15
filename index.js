/* jshint node: true */
'use strict';

var util = require('util');
var extend = util._extend;

var defaultOptions = {
    importCSS: false
};

module.exports = {
  name: 'ember-authenticate-me',

  included(app/*, parentAddon*/ ) {
    this._super.included(app);

    var options = extend(defaultOptions, app.options.emberAuthenticateMe);

    if (options.importCSS) {
      app.import('vendor/css/authentication.css');
    }
  },

  config(/* environment, appConfig */) {
    return {
      apiNamespace: 'api/v1',

      emberAuthenticateMe: {
        sessionUri: '/token_authenticate_me/api/v1/session',
        passwordResetUri: '/token_authenticate_me/api/v1/password_resets',
        inviteUri: '/token_authenticate_me/api/v1/invites',

        sessionKey: 'token_authenticate_me/session'
      },

      torii: {
        sessionServiceName: 'session',

        providers: {
          'traditional-authentication': {},
        }
      }
    };
  },

  isDevelopingAddon() {
    return false;
  }
};
