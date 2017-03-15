import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var user = this.get('store').createRecord('token-authenticate-me/user');

    return user;
  }
});
