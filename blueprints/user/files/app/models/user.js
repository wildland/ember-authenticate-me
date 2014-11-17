import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  /* not persisted in the local store, only sent to server */
  password: null,
  passwordConfirmation: null
});
