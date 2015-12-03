import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  /* not persisted in the local store, only sent to server */
  password: null,
  passwordConfirmation: null,
  currentPassword: null,

  passwordUpdate: Ember.observer('password', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('password');
    }
  }),

  passwordConfirmationUpdate: Ember.observer('passwordConfirmation', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('passwordConfirmation');
    }
  }),

  currentPasswordUpdate: Ember.observer('currentPassword', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('currentPassword');
    }
  })
});
