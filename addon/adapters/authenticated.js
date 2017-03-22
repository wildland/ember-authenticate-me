import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  /* Set application authentication header */
  headers: Ember.computed('session.content.token', function() {
    var token = this.get('session.content.token');

    if (token) {
      return {
        Authorization: 'Token token=' + token
      };
    }
    else {
      return { };
    }
  }),

  handleResponse: function(status/*, headers, payload*/) {
    if (status === 401) {
      return this.get('session').close().finally(() => {
        const router = Ember.getOwner(this).lookup('router:main');

        router.transitionTo('login');
        this.store.unloadAll();
        return this._super(...arguments);
      });
    } else {
      return this._super(...arguments);
    }
  },
});
