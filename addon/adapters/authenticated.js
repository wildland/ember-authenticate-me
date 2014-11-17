import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  /* Set application authentication header */
  headers: function() {
    var token = this.get('session.content.token');

    if (token) {
      return {
        Authorization: 'Token token=' + token
      };
    }
    else {
      return { };
    }
  }.property('session.content.token')
});
