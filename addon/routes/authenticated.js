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
  }
});

export default AuthenticatedRoute;
