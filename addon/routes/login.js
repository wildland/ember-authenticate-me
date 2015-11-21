import Ember from 'ember';
import { isAuthenticated } from 'ember-authenticate-me/mixins/routes/authenticated';

export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    let loginController = this.controllerFor('login');
    let session = this.get('session');

    return isAuthenticated(session).then(() => {
      var previousTransition = loginController.get('previousTransition');

      if (previousTransition) {
        previousTransition.retry();
      }
      else {
        this.transitionTo('/');
      }
    }).catch(() => {
      // no-op, we are not logged in, continue.
    });
  }
});
