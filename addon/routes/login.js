import Ember from 'ember';
import { isAuthenticated } from 'ember-authenticate-me/mixins/routes/authenticated';

export default Ember.Route.extend({
  sessionLifecycle: Ember.inject.service('session-lifecycle'),

  beforeModel: function(/*transition*/) {
    const loginController = this.controllerFor('login');
    const session = this.get('session');
    const sessionLifecycle = this.get('sessionLifecycle');

    return isAuthenticated(session, sessionLifecycle).then(() => {
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
