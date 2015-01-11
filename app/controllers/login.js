import Ember from 'ember';

export default Ember.Controller.extend({
  networks: [],
  username: null,
  password: null,

  actions: {
    logIn: function() {
      var self = this,
          previousTransition = this.get('previousTransition'),
          authenticationParams = {
            username: this.get('username') || '',
            password: this.get('password') || ''
          };

      this.set('isProcessing', true);

      this.get('session').open('traditional-authentication', authenticationParams).then(function() {
        self.set('isProcessing', false);

        if (previousTransition) {
          self.set('previousTransition', null);
          previousTransition.retry();
        }
        else {
          self.transitionToRoute('/');
        }

      }, function(error) {
        try {
          if (error.status === 0 && error.statusText === "error") {
            self.set('error', 'Unable to authenticate user: Cannot communicate with server');
          }
          else {
            self.set('error', 'Unable to authenticate user: ' + JSON.parse(error.responseText).message);
          }
        }
        catch (e) {
          console.log("Authentication Error: ", e);
          self.set('error', 'Unable to authenticate user: An unknown error has occurred');
        }
      }).finally(function() {
        self.set('isProcessing', false);
      });
    }
  }
});
