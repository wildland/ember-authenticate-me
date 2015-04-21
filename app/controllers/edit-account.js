import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function(user) {
      var self = this;

      user.get('errors').clear();
      user.save().then(function() {
        self.transitionToRoute('/');
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
