import Ember from 'ember';

export function isAuthenticated(session) {
  var authenticated = session.get('content.isAuthenticated');

  return new Ember.RSVP.Promise(function(resolve, reject) {
    if (!authenticated) {
      session.fetch().then((...args) => {
        resolve(...args);
      }).catch((e) => {
        reject(e);
      });
    } else {
      resolve(session);
    }
  });
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
