/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon({
  emberAuthenticateMe: {
    importCSS: true
  }
});

var app = new EmberAddon();

module.exports = app.toTree();
