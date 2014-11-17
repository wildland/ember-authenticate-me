import Ember from 'ember';

export default Ember.ObjectController.extend({
  firstError: function() {
    var errorMessage = this.get('errors.firstObject');

    if (errorMessage) {
      var readableAttribute = errorMessage.attribute.dasherize().replace('-', ' ');
      return readableAttribute.capitalize() + ": " + errorMessage.message;
    }
    else {
      return null;
    }
  }.property('errors.firstObject'),

  checkPassword: function() {
    var callback = this.get('checkPasswordCallback');

    Ember.run.cancel(callback);

    callback = Ember.run.later(this, function() {
      var password = this.get('password'),
          passwordConfirmation = this.get('passwordConfirmation'),
          errors = this.get('errors');

      errors.remove('password');
      errors.remove('passwordConfirmation');

      if (!password) {
        errors.add('password', "Cannot be blank.");
      }
      if (password && password !== passwordConfirmation) {
        errors.add('passwordConfirmation', "Passwords must match.");
      }
    }, 600);

    this.set('checkPasswordCallback', callback);
  }.observes('password', 'passwordConfirmation'),

  loginNewUser: function(username, password) {
    var self = this,
        authenticationParams = {
          username: username,
          password: password
        };

    this.get('session').open('traditional-authentication', authenticationParams).then(function() {
        self.transitionTo('home');
    }, function(error) {
      console.log("Error authenticating new user: ", error);

      // Transitioning to home will redirect to login
      self.transitionTo('home');
    });
  },

  actions: {
    signup: function() {
      var isValid = this.get('isValid'),
          self = this;

      if (isValid) {
        var username = self.get('username'),
            password = self.get('password');

        this.get('model').save().then(function(/* user */) {
          self.set('password', null);
          self.set('passwordConfirmation', null);

          self.loginNewUser(username, password);

        }, function(error) {
          console.log("Error creating new user:", error);
        });
      }
    }
  }
});
