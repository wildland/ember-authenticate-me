import Ember from 'ember';
import AuthenticatedMixin from 'ember-authenticate-me/mixins/routes/authenticated';

export default Ember.Route.extend(AuthenticatedMixin, {
  beforeModel() {
    this._super(...arguments);

    this.get('session').close().then(() => {
      const sessionLifecycle = this.get('sessionLifecycle');

      sessionLifecycle.userLoggedOut();
      this.transitionTo('login');
    }).catch((error) => {
      Ember.Logger.error("Error logging out: ", error);
      this.transitionTo('login');
    }).finally(() => {
      this.store.unloadAll();
    });
  }
});
