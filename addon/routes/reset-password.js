import Ember from 'ember';

export default Ember.Route.extend({
  model: function({ token }) {
    return {
      token: token
    };
  }
});
