import Ember from 'ember';

export function isAuthenticated(session) {
  var authenticated = session.get('content.isAuthenticated');
  var deferedAuthentication = Ember.RSVP.defer();

  if (!authenticated) {
    session.fetch().then((...args) => {
      deferedAuthentication.resolve(...args);
    }).catch((e) => {
      deferedAuthentication.reject(e);
    });
  } else {
    deferedAuthentication.resolve(session);
  }

  return deferedAuthentication.promise;
}

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    let session = this.get('session');
    return isAuthenticated(session).catch(() => {
      console.log("No user session, transitioning to login.");
      let loginController = this.controllerFor('login');

      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    });
  },

  actions: {
    error: function(error, transition) {

      if (error && error.status === 401) {
        let loginController = this.controllerFor('login');

        loginController.set('previousTransition', transition);
        this.get('session').close().then(() => {
          this.transitionTo('login');
        }).catch((error) => {
          console.log(`Error ${error}`);
          this.transitionTo('login');
        });
      }

      return true;
    }
  }
});
