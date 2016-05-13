import Ember from 'ember';

export default Ember.Controller.extend({
  transitionRoute: 'index',

  transitionOut: function() {
    const transitionRoute = this.get('transitionRoute');

    this.transitionToRoute(transitionRoute);
  },

  actions: {
    save: function(user) {
      user.get('errors').clear();
      return user.save().then(() => {
        this.transitionOut();
      });
    },

    cancel: function(user) {
      if (window.confirm("All unsved changes will be lost. Are you sure?"))
      {
        user.rollbackAttributes();
        this.transitionOut();
      }
    }
  }
});
