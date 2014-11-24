import Ember from 'ember';
import ENV from '../config/environment';

var PASSWORD_RESET_URI = ENV.emberAuthenticateMe.passwordResetUri || '/api/password_resets';

export default Ember.Controller.extend({
  email: null,
  requestSent: false,
  actions: {
    forgotPassword: function() {
      var self = this;

      Ember.$.ajax({
        type: "POST",
        url: PASSWORD_RESET_URI,
        data: {
          email: this.get('email')
        },

        success: function(data){
          self.set('requestSent', true);
        }
      });
    }
  }
});
