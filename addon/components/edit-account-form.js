import Ember from 'ember';
import layout from '../templates/components/edit-account-form';

export default Ember.Component.extend({
  layout: layout,
  tagName: '',

  _isSaving: false,

  actions: {
    save(user) {
      this.set('_isSaving', true);

      this.get('save')(user).finally(() => {
        this.set('_isSaving', false);
      });
    },

    cancel(user) {
      this.get('cancel')(user);
    },
  }
});
