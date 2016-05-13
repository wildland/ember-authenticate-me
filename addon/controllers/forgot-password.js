import Ember from 'ember';
import getConfig from 'ember-authenticate-me/configuration';

export default Ember.Controller.extend({
  email: null,
  requestSent: false,
  actions: {
    forgotPassword: function() {
      const emberAuthenticateMeConfig = getConfig();
      const PASSWORD_RESET_URI = emberAuthenticateMeConfig.passwordResetUri || '/api/password_resets';
      const self = this;

      Ember.$.ajax({
        type: "POST",
        url: PASSWORD_RESET_URI,
        data: {
          email: this.get('email')
        },

        success: function(/*data*/){
          self.set('requestSent', true);
        }
      });
    }
  }
});
