import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key/*, attribute*/) {

    /* skip searializing createdAt and updatedAt fields, the server sets these */
    if (key !== "createdAt" && key !== "updatedAt") {
      this._super.apply(this, arguments);
    }
  },

  serialize: function(record/*, options*/) {
    var json = this._super.apply(this, arguments);
    var password = record.get('password');
    var passwordConfirmation = record.get('passwordConfirmation');
    var currentPassword = record.get('currentPassword');

    json.password = password;
    json.password_confirmation = passwordConfirmation;
    json.current_password = currentPassword;

    record.set('password', null);
    record.set('passwordConfirmation', null);
    record.set('currentPassword', null);

    return json;
  }
});
