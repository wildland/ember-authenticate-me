import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serializeAttribute: function(record, json, key/*, attribute*/) {

    /* skip searializing createdAt and updatedAt fields, the server sets these */
    if (key !== "createdAt" && key !== "updatedAt"){
      this._super.apply(this, arguments);
    }
  },
  
  serialize: function(record/*, options*/) {
    var json = this._super.apply(this, arguments),
        password = record.get('password'),
        passwordConfirmation = record.get('passwordConfirmation');

    json["password"] = password;
    json["password_confirmation"] = passwordConfirmation;

    record.set('password', null);
    record.set('passwordConfirmation', null);

    return json;
  }
});
