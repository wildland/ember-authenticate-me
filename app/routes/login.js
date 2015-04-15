import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    var loginController = this.controllerFor('login');
    var self            = this;

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
});
