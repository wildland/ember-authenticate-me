import Ember from 'ember';

const { get, set, computed } = Ember;

export default Ember.Controller.extend({
  transitionRoute: 'index',
  alwaysSkipPreviousTransition: false,

  isTransitioningToPrevious: computed(
    'previousTransition',
    'alwaysSkipPreviousTransition',
    function() {
      const previousTransition = get(this, 'previousTransition');
      const usePreviousTransition = !get(this, 'alwaysSkipPreviousTransition');

      return previousTransition &&
          usePreviousTransition &&
          previousTransition.targetName !== 'logout' &&
          previousTransition.targetName !== 'login';
    }
  ),

  firstError: computed('model.errors.firstObject', function() {
    var model = get(this, 'model');
    var errorMessage = get(model, 'errors.firstObject');

    if (errorMessage) {
      var readableAttribute = errorMessage.attribute.dasherize().replace('-', ' ');
      return readableAttribute.capitalize() + ": " + errorMessage.message;
    }
    else {
      return null;
    }
  }),

  transitionToPrevious: function() {
    var previousTransition = this.get('previousTransition');

    this.set('previousTransition', null);
    previousTransition.retry();
  },

  transitionToLoggedInRoute() {
    const transitionRoute = this.get('transitionRoute');

    this.transitionToRoute(transitionRoute);
  },

  loginNewUser: function(username, password) {
    const isTransitioningToPrevious = this.get('isTransitioningToPrevious');
    const authenticationParams = {
      username: username,
      password: password
    };

    this.get('session').open('traditional-authentication', authenticationParams).then(() => {
      if (isTransitioningToPrevious) {
        this.transitionToPrevious();
      }
      else {
        this.transitionToLoggedInRoute();
      }
    }).catch((error) => {
      Ember.Logger.error('Error authenticating new user: ', error);

      throw error;
    });
  },

  signupUser(model) {
    const username = get(model, 'username');
    const password = get(model, 'password');

    model.get('errors').clear();
    return model.save().then((/* user */) => {
      set(model, 'password', null);
      set(model, 'passwordConfirmation', null);

      this.loginNewUser(username, password);
    });
  },

  actions: {
    signup(model) {
      return this.signupUser(model);
    }
  }
});
