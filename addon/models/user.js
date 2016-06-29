import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;
const { observer } = Ember;

export default Model.extend({
  username: attr('string'),
  email: attr('string'),

  createdAt: attr('date'),
  updatedAt: attr('date'),

  /* not persisted in the local store, only sent to server */
  password: null,
  passwordConfirmation: null,
  currentPassword: null,

  passwordUpdate: observer('password', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('password');
    }
  }),

  passwordConfirmationUpdate: observer('passwordConfirmation', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('passwordConfirmation');
    }
  }),

  currentPasswordUpdate: observer('currentPassword', function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('currentPassword');
    }
  }),
});
