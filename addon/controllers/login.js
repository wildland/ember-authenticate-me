import Ember from 'ember';

const { get, set, computed } = Ember;

export default Ember.Controller.extend({
  networks: [],
  username: null,
  password: null,
  transitionRoute: 'index',
  alwaysSkipPreviousTransition: false,

  transitionToPrevious: function() {
    var previousTransition = this.get('previousTransition');

    this.set('previousTransition', null);
    previousTransition.retry();
  },

  transitionToLoggedInRoute: function() {
    const transitionRoute = this.get('transitionRoute');

    this.transitionToRoute(transitionRoute);
  },

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

  actions: {
    login: function(username, password) {
      const usePreviousTransition = this.get('usePreviousTransition');

      const authenticationParams = {
        username: username || '',
        password: password || ''
      };

      return get(this, 'session').open(
        'traditional-authentication',
        authenticationParams
      ).then((sessionContent) => {
        if (usePreviousTransition) {
          this.transitionToPrevious(sessionContent);
        } else {
          this.transitionToLoggedInRoute(sessionContent);
        }
      }).catch((error) => {
        if (error && error.status === 0 && error.statusText === 'error') {
          set(this, 'error', 'Unable to authenticate user: Cannot communicate with server');
        }
        else if(error && error.responseText) {
          set(this,
            'error',
            'Unable to authenticate user: ' + JSON.parse(error.responseText).message
          );
        } else {
          Ember.Logger.error('Authentication Error: ', error);
          set(this, 'error', 'Unable to authenticate user: An unknown error has occurred');
        }

        throw error; /* bubble error for others to view */
      });
    }
  }
});
