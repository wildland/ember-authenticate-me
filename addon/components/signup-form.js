import Ember from 'ember';
import layout from '../templates/components/signup-form';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  _isSaving: false,

  actions: {
    save(user) {
      this.set('_isSaving', true);

      this.get('signup')(user).finally(() => {
        this.set('_isSaving', false);
      });
    }
  }
});
