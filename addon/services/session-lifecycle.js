import Ember from 'ember';

export default Ember.Service.extend({
  _loginCallbacks: [],
  _logoutCallbacks: [],

  userLoggedIn(session) {
    const loginCallbacks = this.get('_loginCallbacks');

    Ember.run(() => {
      loginCallbacks.forEach(func => Ember.run.next(null, () => func(session)));
    });
  },

  userLoggedOut(session) {
    const logoutCallbacks = this.get('_logoutCallbacks');

    Ember.run(() => {
      logoutCallbacks.forEach(func => Ember.run.next(null, () => func(session)));
    });
  },

  registerLoginCallback(func) {
    const loginCallbacks = this.get('_loginCallbacks');

    this.set('_loginCallbacks', loginCallbacks.concat([func]));
  },

  registerLogoutCallback(func) {
    const logoutCallbacks = this.get('_logoutCallbacks');

    this.set('_logoutCallbacks', logoutCallbacks.concat([func]));
  },
});
