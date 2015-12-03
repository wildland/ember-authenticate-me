import Ember from 'ember';

export default Ember.Object.extend({
  name: 'traditional-authentication',

  configNamespace: Ember.computed('name', function(){
    return 'providers.' + this.get('name');
  }),

  open: function(authenticationParams) {
    return new Ember.RSVP.Promise(function(resolve/*, reject*/) {
      resolve(authenticationParams);
    });
  },

  fetch: function(/* options */) {},

  close: function(/* options */) {}
});
