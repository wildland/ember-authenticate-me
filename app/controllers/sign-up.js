import Ember from 'ember';

export default Ember.ObjectController.extend({
  firstError: function() {
    var errorMessage = this.get('model.errors.firstObject');

    if (errorMessage) {
      var readableAttribute = errorMessage.attribute.dasherize().replace('-', ' ');
      return readableAttribute.capitalize() + ": " + errorMessage.message;
    }
    else {
      return null;
    }
  }.property('model.errors.firstObject'),

  loginNewUser: function(username, password) {
    var self = this,
        authenticationParams = {
          username: username,
          password: password
        };

    this.get('session').open('traditional-authentication', authenticationParams).then(function() {
        self.transitionTo('/');
    }, function(error) {
      console.log("Error authenticating new user: ", error);

      // Transitioning to home will redirect to login
      self.transitionTo('/');
    });
  },

  actions: {
    signup: function() {
      var isValid = this.get('isValid'),
          self = this;

      if (isValid) {
        var username = self.get('model.username'),
            password = self.get('model.password');

        this.get('model').save().then(function(/* user */) {
          self.set('model.password', null);
          self.set('model.passwordConfirmation', null);

          self.loginNewUser(username, password);

        }, function(error) {
          console.log("Error creating new user:", error);
        });
      }
    }
  }
});
