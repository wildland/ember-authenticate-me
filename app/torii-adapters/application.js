import Ember from 'ember';

// TODO: Look this up from the ENV and default to '/api/session' if it doesn't exist.
var SESSION_URI = '/api/session';

function _ajaxOptions(authorizaton) {
  return {
    url: SESSION_URI,
    data: JSON.stringify(authorizaton),
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
  };
}

function _ajaxError(jqXHR/*, responseText*/) {
  if (jqXHR && typeof jqXHR === 'object') {
    jqXHR.then = null;
  }

  return jqXHR;
}

export default Ember.Object.extend({
  sessionKey: null,

  open: function(authorizaton) {
    var self = this,
    hash = _ajaxOptions(authorizaton);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      hash.success = function(json/*, textStatus, jqXHR*/) {
          Ember.run(null, resolve, json);
      };

      hash.error = function(jqXHR/*, textStatus, errorThrown*/) {
        Ember.run(null, reject, _ajaxError(jqXHR, jqXHR.responseText));
      };

      Ember.$.ajax(hash);
    }).then(function(params) {
      var session = self.container.lookup('torii:session');

      session.set('content', {token: params.session.key});
      self.set('token', params.session.key);

      return {
        token: params.session.key,
        expiration: params.session.expiration
      };
    });
  },

  /**
  * This method destroys/unauthenticates the existing session with the server.
  **/
  close: function() {
    //TODO: Lookup token via local storage, and query the server using the token.
    var token = this.get('token');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: SESSION_URI,
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        headers: {Authorization: 'Token token=' + token},
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      }).then(function(data) {
        return data;
      });
    });
  },

  /**
  * This method is for checking to see if there is a session saved somewhere in memory
  * and then verifying that it is valid.
  **/
  fetch: function() {
    //TODO: Lookup token via local storage, query the server using the token, and return the session
    var token = this.get('token');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: SESSION_URI,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        headers: {Authorization: 'Token token=' + token},
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      }).then(function(data) {
        return data;
      });
    });
  }
});
