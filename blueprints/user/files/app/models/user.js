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

  /*
    This callback is marked as private and could be changed unexpectedly
    on updates to ember-data. We are overriding it because it is called
    by the store to set errors on the property 'errors', and need to
    set errors for 'password', 'passwordConfirmation', and 'currentPassword'
  */
  adapterDidInvalidate: function(errors) {
    var recordErrors = Ember.get(this, 'errors');
    var extraProperties = ['password', 'passwordConfirmation', 'currentPassword'];

    function addError(name) {
      if (errors[name]) {
        recordErrors.add(name, errors[name]);
      }
    }

    extraProperties.forEach(addError);
    this.eachAttribute(addError);
    this.eachRelationship(addError);
    this._saveWasRejected();
  },

  passwordUpdate: function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('password');
    }
  }.observes('password'),

  passwordConfirmationUpdate: function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('passwordConfirmation');
    }
  }.observes('passwordConfirmation'),

  currentPasswordUpdate: function() {
    var errors = this.get('errors');

    if (errors) {
      errors.remove('currentPassword');
    }
  }.observes('currentPassword')
});
