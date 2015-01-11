import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    var isAuthenticated = this.get('session.content.isAuthenticated'),
        loginController = this.controllerFor('login'),
        self            = this;

    if (isAuthenticated) {
      this.transitionTo('/');
    }
    else {
      return this.get('session').fetch().then(function() {
        var previousTransition = loginController.get('previousTransition');

        if (previousTransition) {
          previousTransition.retry();
        }
        else {
          self.transitionTo('/');
        }
      }, function() { /* noop */ });
    }
  }
});
