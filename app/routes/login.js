import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(/*transition*/) {
    var isAuthenticated = this.get('session.content.isAuthenticated'),
        self = this;

    if (isAuthenticated) {
      this.get('session.content.currentUser.lastOrganizationContext').then(function(defaultOrg) {
        self.transitionTo('organization.items', defaultOrg);
      }, function(/* error */) {
        self.transitionTo('request-to-join-organizations');
      });
    }
  },

  actions: {
    logIn: function() {
      var self = this,
          controller = this.controllerFor('login'),
          previousTransition = controller.get('previousTransition'),
          authenticationParams = {
            username: controller.get('username') || '',
            password: controller.get('password') || ''
          };

      controller.set('isProcessing', true);

      this.get('session').open('traditional-authentication', authenticationParams).then(function() {
        if (previousTransition) {
          controller.set('previousTransition', null);
          previousTransition.retry();
        }
        else {
          self.transitionTo('/');
        }

      }, function(error) {
        try {
          controller.set('error', 'Unable to authenticate user: ' + JSON.parse(error.responseText).message);
        }
        catch (e) {
          controller.set('error', 'Unable to authenticate user: An unknown error has occurred');
        }
      }).finally(function() {
        controller.set('isProcessing', false);
      });
    }
  }
});
