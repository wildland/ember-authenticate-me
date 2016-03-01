import Ember from 'ember';
import inject from 'ember-cli-injection/inject';

var injectStore = inject('store');
var injectTorii = inject('torii');

export default Ember.Object.extend({
  sessionKey: null,
  store: injectStore('main'),
  session: injectTorii('session'),

  sessionUri: '/api/session',

  _ajaxOptions: function(authorizaton) {
    return {
      url: this.get('sessionUri'),
      data: JSON.stringify(authorizaton),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
    };
  },

  _ajaxError: function(jqXHR/*, responseText*/) {
    if (jqXHR && typeof jqXHR === 'object') {
      jqXHR.then = null;
    }

    return jqXHR;
  },

  _storeCurrentUser: function(userPayload) {
    var store = this.get('store');

    /*******
     * Written for ember 1.13 and above support.
     * For ember-data 2.0 only, this should change to:
     *  const user = store.push(store.normalize('user', userPayload));
    ********/
    const user = store.push('user', store.normalize('user', userPayload));

    return Ember.RSVP.resolve(user);
  },

  open: function(authorizaton) {
    var self = this,
        hash = this._ajaxOptions(authorizaton);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      hash.success = function(json/*, textStatus, jqXHR*/) {
        Ember.run(null, resolve, json);
      };

      hash.error = function(jqXHR/*, textStatus, errorThrown*/) {
        Ember.run(null, reject, self._ajaxError(jqXHR, jqXHR.responseText));
      };

      Ember.$.ajax(hash);
    }).then(function(params) {
      var session = self.get('session');

      session.set('content', { token: params.session.key });

      if (window.localStorage) {
        window.localStorage.setItem('eam-token', params.session.key);
      }
      else {
        self.set('token', params.session.key);
      }

      return self._storeCurrentUser(params.session.user).then(function(currentUser) {
        return {
          token: params.session.key,
          expiration: params.session.expiration,
          currentUser: currentUser
        };
      });
    });
  },

  /**
  * This method destroys/unauthenticates the existing session with the server.
  **/
  close: function() {
    var token = null,
        self  = this;

    if (window.localStorage) {
      token = window.localStorage.getItem('eam-token');
    }
    else {
      token = self.get('token');
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: self.get('sessionUri'),
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        headers: { Authorization: 'Token token=' + token },
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
    var self  = this,
        token = null;

    if (window.localStorage) {
      token = window.localStorage.getItem('eam-token');
    }

    if (token) {
      var hash = {
        url: this.get('sessionUri'),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
          headers: { Authorization: 'Token token=' + token }
      };
      return new Ember.RSVP.Promise(function(resolve, reject) {
        hash.success = function(json/*, textStatus, jqXHR*/) {
          Ember.run(null, resolve, json);
        };

        hash.error = function(jqXHR/*, textStatus, errorThrown*/) {
          Ember.run(null, reject, self._ajaxError(jqXHR, jqXHR.responseText));
        };

        Ember.$.ajax(hash);
      }).then(function(params) {
        var session = self.get('session');

        session.set('content', { token: params.session.key });

        return self._storeCurrentUser(params.session.user).then(function(currentUser) {
          return {
            token: params.session.key,
            expiration: params.session.expiration,
            currentUser: currentUser
          };
        });
      });
    }
    else {
      return new Ember.RSVP.Promise(function(resolve, reject) {
        reject();
      });
    }
  }
});
