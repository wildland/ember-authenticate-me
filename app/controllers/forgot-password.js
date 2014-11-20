import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,
  requestSent: false,
  actions: {
    forgotPassword: function() {
      var self = this;

      Ember.$.ajax({
        type: "POST",
        url: '/api/password_resets/',
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
