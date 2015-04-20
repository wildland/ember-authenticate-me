import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Controller.extend({
  networks: [],
  username: null,
  password: null,

  actions: {
    logIn: function() {
      var previousTransition = get(this, 'previousTransition');
      var authenticationParams = {
        username: get(this, 'username') || '',
        password: get(this, 'password') || ''
      };

      set(this, 'isProcessing', true);

      get(this, 'session').open('traditional-authentication', authenticationParams).then(() => {
        set(this, 'isProcessing', false);

        if (previousTransition) {
          set(this, 'previousTransition', null);
          previousTransition.retry();
        }
        else {
          this.transitionToRoute('/');
        }

      }, (error) => {
        try {
          if (error.status === 0 && error.statusText === "error") {
            set(this, 'error', 'Unable to authenticate user: Cannot communicate with server');
          }
          else {
            set(this,
              'error',
              'Unable to authenticate user: ' + JSON.parse(error.responseText).message
            );
          }
        }
        catch (e) {
          console.log("Authentication Error: ", e);
          set(this, 'error', 'Unable to authenticate user: An unknown error has occurred');
        }
      }).finally(() => {
        set(this, 'isProcessing', false);
      });
    }
  }
});
