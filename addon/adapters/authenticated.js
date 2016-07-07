import Ember from 'ember';
import DS from 'ember-data';
import inject from 'ember-cli-injection/inject';

var injectStore = inject('store');
var injectTorii = inject('torii');
var injectRouter = inject('router');

export default DS.ActiveModelAdapter.extend({
  session: injectTorii('session'),
  router: injectRouter('main'),
  store: injectStore('main'),
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

  handleResponse: function(status, headers, payload) {
    if (status == 401) {
      return this.get('session').close().finally(() => {
        this.get('router').transitionTo('login');
        this.store.unloadAll();
        return this._super(...arguments);
      });
    } else {
      return this._super(...arguments);
    }
  },
});
