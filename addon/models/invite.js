import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  creator: belongsTo('user', { async: true }),
  email: attr('string'),
  accepted: attr('string'),
  meta: attr(),

  createdAt: attr('date'),
  updatedAt: attr('date'),
});
