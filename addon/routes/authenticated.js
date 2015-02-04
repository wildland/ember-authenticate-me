import Ember from 'ember';

var AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    var isAuthenticated = this.get('session.content.isAuthenticated');

    if (!isAuthenticated) {
      console.log("No user session, transitioning to login.");
      var loginController = this.controllerFor('login');

      loginController.set('previousTransition', transition);
      this.transitionTo('login');

      return false;
    }
    else {
      return true;
    }
  },

  actions: {
    error: function(error, transition) {

      if (error && error.status === 401) {
        var loginController = this.controllerFor('login');
        var self            = this;

        loginController.set('previousTransition', transition);
        this.get('session').close().then(function() {
          self.transitionTo('login');
        }).catch(function(error) {
          self.transitionTo('login');
        });
      }

      return this._super.apply(this, arguments);
    }
  }
});

export default AuthenticatedRoute;
