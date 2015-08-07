import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Controller.extend({
  networks: [],
  username: null,
  password: null,
  transitionRoute: 'index',

  transitionToPrevious: function() {
    var previousTransition = this.get('previousTransition');

    this.set('previousTransition', null);
    previousTransition.retry();
  },

  transitionToLoggedInRoute: function() {
    var transitionRoute = this.get('transitionRoute');

    this.transitionToRoute(transitionRoute);
  },

  actions: {
    logIn: function() {
      var previousTransition = get(this, 'previousTransition');
      var authenticationParams = {
        username: get(this, 'username') || '',
        password: get(this, 'password') || ''
      };

      set(this, 'isProcessing', true);

      get(this, 'session').open('traditional-authentication', authenticationParams)
          .then((sessionContent) => {
        set(this, 'isProcessing', false);

        if (previousTransition && previousTransition.targetName !== 'logout' &&
            previousTransition.targetName !== 'login') {
          this.transitionToPrevious(sessionContent);
        }
        else {
          this.transitionToLoggedInRoute(sessionContent);
        }

      }, (error) => {
        try {
          if (error.status === 0 && error.statusText === 'error') {
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
          console.log('Authentication Error: ', e);
          set(this, 'error', 'Unable to authenticate user: An unknown error has occurred');
        }
      }).finally(() => {
        set(this, 'isProcessing', false);
      });
    }
  }
});
