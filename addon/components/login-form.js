import Ember from 'ember';
import layout from '../templates/components/login-form';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  _isProcessing: false,

  actions: {
    login(username, password) {
      this.set('_isProcessing', true);
      return this.get('login')(username, password).finally(() => {
        this.set('_isProcessing', false);
      });
    }
  }
});
