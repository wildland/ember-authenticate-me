import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var user = this.get('store').createRecord('user');

    return user;
  }
});
