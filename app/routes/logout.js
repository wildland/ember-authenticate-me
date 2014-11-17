import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var self = this;

    this.get('session').close().then(function() {
      self.transitionTo('login');
    }).catch(function(error) {
      console.log("Error logging out: ", error);
      self.transitionTo('login');
    });
  }
});
