import Ember from 'ember';
import ENV from '../config/environment';

var PASSWORD_RESET_URI = ENV.emberAuthenticateMe.passwordResetUri || '/api/password_resets';

export default Ember.ObjectController.extend({
  password: null,
  passwordConfirmation: null,
  error: null,

  checkPassword: Ember.observer('password', 'passwordConfirmation', function() {
    var callback = this.get('checkPasswordCallback');

    Ember.run.cancel(callback);

    callback = Ember.run.later(this, function() {
      var password = this.get('password'),
          passwordConfirmation = this.get('passwordConfirmation');

      this.set('error', null);

      if (!password) {
        this.set('error', "Password cannot be blank.");
      }
      if (password && password !== passwordConfirmation) {
        this.set('error', "Passwords must match.");
      }
    }, 600);

    this.set('checkPasswordCallback', callback);
  }),

  actions: {
    reset: function() {
      var error = this.get('error');
      var self = this;

      if (!error) {
        Ember.$.ajax({
          type: "PUT",
          url: [PASSWORD_RESET_URI, this.get('token')].join('/'),

          data: {
            password: this.get('password'),
            password_confirmation: this.get('password_confirmation')
          },

          success: function(data){
            self.transitionTo('/login');
          },

          error: function(err, text) {
            self.set('error', 'An unknown error has occurred.');
          }
        });
      }
    }
  }
});
