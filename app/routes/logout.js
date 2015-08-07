import Ember from 'ember';
import AuthenticatedMixin from 'ember-authenticate-me/mixins/routes/authenticated';

export default Ember.Route.extend(AuthenticatedMixin, {
  beforeModel: function() {
    var self = this;

    this._super(...arguments);

    this.get('session').close().then(function() {
      self.transitionTo('login');
    }).catch(function(error) {
      console.log("Error logging out: ", error);
      self.transitionTo('login');
    });
  }
});
