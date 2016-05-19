import { configure } from 'ember-authenticate-me/configuration';
import config from '../config/environment';


var initializer = {
    name: 'ember-authenticate-me',
    initialize: function(application) {
      if (arguments[1]) { // Ember < 2.1
          application = arguments[1];
      }

      configure(config.emberAuthenticateMe || {});
    },
};

export default initializer;
