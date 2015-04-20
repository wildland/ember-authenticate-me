import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Controller.extend({
  firstError: Ember.computed('model.errors.firstObject', function() {
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

  loginNewUser: function(username, password) {
    var previousTransition = get(this, 'previousTransition');
    var authenticationParams = {
      username: username,
      password: password
    };

    this.get('session').open('traditional-authentication', authenticationParams).then(() => {
        if (previousTransition) {
          set(this, 'previousTransition', null);
          previousTransition.retry();
        }
        else {
          this.transitionToRoute('/');
        }
    }, (error) => {
      console.log('Error authenticating new user: ', error);

      // Transitioning to home will redirect to login
      this.transitionTo('/');
    });
  },

  actions: {
    signup: function() {
      var model = get(this, 'model');

      var username = get(model, 'username');
      var password = get(model, 'password');

      model.get('errors').clear();
      model.save().then((/* user */) => {
        set(model, 'password', null);
        set(model, 'passwordConfirmation', null);

        this.loginNewUser(username, password);

      }, function(error) {
        console.log('Error creating new user: ', error);
      });
    }
  }
});
