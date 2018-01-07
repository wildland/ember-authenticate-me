import Ember from 'ember';
import getConfig from 'ember-authenticate-me/configuration';
const { run } = Ember;

export default Ember.Controller.extend({
  password: null,
  passwordConfirmation: null,
  error: null,

  checkPassword: Ember.observer('password', 'passwordConfirmation', function() {
    var callback = this.get('checkPasswordCallback');

    run(() => {
      run.cancel(callback);

      callback = run.later(this, function() {
        const password = this.get('password');
        const passwordConfirmation = this.get('passwordConfirmation');

        this.set('error', null);

        if (!password) {
          this.set('error', "Password cannot be blank.");
        }
        if (password && password !== passwordConfirmation) {
          this.set('error', "Passwords must match.");
        }
      }, 600);

      this.set('checkPasswordCallback', callback);
    });
  }),
  
  passwordResetComplete() {
    this.transitionToRoute('/login');
  },

  actions: {
    reset: function() {
      const emberAuthenticateMeConfig = getConfig();
      const error = this.get('error');
      const self = this;
      const PASSWORD_RESET_URI = emberAuthenticateMeConfig.passwordResetUri ||
        '/api/password_resets';

      if (!error) {
        return Ember.$.ajax({
          type: "PUT",
          url: [PASSWORD_RESET_URI, this.get('model.token')].join('/'),

          data: {
            password: this.get('password'),
            password_confirmation: this.get('password_confirmation')
          },

          success(/*data*/){
            self.passwordResetComplete();
          },

          error(err/*, text*/) {
            self.set('error', 'An unknown error has occurred.');
            throw err;
          }
        });
      }
    }
  }
});
