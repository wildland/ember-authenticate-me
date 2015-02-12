import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    save: function(user) {
      var self = this;
      debugger;
      user.save().then(function() {
        self.transitionToRoute('/');
      }, function(response){
        var errors = response.errors;
        var phantomAttr = ['password', 'password_confirmation', 'current_password'];
        for(var attr in errors){
            if(phantomAttr.indexOf(attr) > -1) {
                user.get('errors').add(attr.camelize(), errors[attr]);
            }
            console.log(attr.camelize() + ': ' + errors[attr]);
        }
      });
    },

    cancel: function(user) {
      if (window.confirm("All unsved changes will be lost. Are you sure you want to leave?"))
      {
        user.rollback();
        this.transitionToRoute('/');
      }
    }
  }
});
