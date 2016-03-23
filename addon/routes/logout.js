import Ember from 'ember';
import AuthenticatedMixin from 'ember-authenticate-me/mixins/routes/authenticated';

export default Ember.Route.extend(AuthenticatedMixin, {
  beforeModel() {
    this._super(...arguments);

    this.get('session').close().then(() => {
      this.store.unloadAll();
      this.transitionTo('login');
    }).catch(function(error) {
      console.log("Error logging out: ", error);
      this.transitionTo('login');
    });
  }
});
