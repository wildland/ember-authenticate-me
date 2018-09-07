import Ember from 'ember';

const { assert, inject } = Ember;

export default Ember.Object.extend({
  store: inject.service('store'),
  session: inject.service('session'),

  /*
   * Injected into the app through the application torii-adapter.
   * See `app/torii-adapters/application.js` for details
   */
  sessionUri: null,
  sessionKey: null,

  _ajaxOptions(authorizaton) {
    return {
      url: this.get('sessionUri'),
      data: JSON.stringify(authorizaton),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
    };
  },

  _ajaxError(jqXHR/*, responseText*/) {
    if (jqXHR && typeof jqXHR === 'object') {
      jqXHR.then = null;
    }

    return jqXHR;
  },

  _storeCurrentUser(userPayload) {
    const store = this.get('store');

    const user = store.push(store.normalize('token-authenticate-me/user', userPayload));

    return Ember.RSVP.resolve(user);
  },

  _returnSessionPayload(sessionPayload) {
    return this._storeCurrentUser(sessionPayload.user).then(function(currentUser) {
      return {
        token: sessionPayload.key,
        expiration: sessionPayload.expiration,
        currentUser: currentUser
      };
    });
  },

  open(authorizaton) {
    const hash = this._ajaxOptions(authorizaton);

    return new Ember.RSVP.Promise((resolve, reject) => {
      hash.success = (json/*, textStatus, jqXHR*/) => {
        Ember.run(null, resolve, json);
      };

      hash.error = (jqXHR/*, textStatus, errorThrown*/) => {
        Ember.run(null, reject, this._ajaxError(jqXHR, jqXHR.responseText));
      };

      Ember.$.ajax(hash);
    }).then((params) => {
      const session = this.get('session');
      const sessionKey = this.get('sessionKey');
      const sessionPayload = params[sessionKey];

      assert(`Unable to find session key ${sessionKey} in payload ${params}`, sessionPayload);

      session.set('content', { token: sessionPayload.key });

      if (window.localStorage) {
        window.localStorage.setItem('eam-token', sessionPayload.key);
      }
      else {
        this.set('token', sessionPayload.key);
      }

      return this._storeCurrentUser(sessionPayload.user).then((currentUser) => {
        return {
          token: sessionPayload.key,
          expiration: sessionPayload.expiration,
          currentUser: currentUser
        };
      });
    });
  },

  /**
  * This method destroys/unauthenticates the existing session with the server.
  **/
  close() {
    let token = null;

    if (window.localStorage) {
      token = window.localStorage.getItem('eam-token');
    }
    else {
      token = this.get('token');
    }

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: this.get('sessionUri'),
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        headers: { Authorization: `Token token=${token}` },
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      }).then((data) => {
        return data;
      });
    });
  },

  /**
  * This method is for checking to see if there is a session saved somewhere in memory
  * and then verifying that it is valid.
  **/
  fetch() {
    let token = null;

    if (window.localStorage) {
      token = window.localStorage.getItem('eam-token');
    }

    if (token) {
      const hash = {
        url: this.get('sessionUri'),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        headers: { Authorization: `Token token=${token}` }
      };

      return new Ember.RSVP.Promise((resolve, reject) => {
        hash.success = (json/*, textStatus, jqXHR*/) => {
          Ember.run(null, resolve, json);
        };

        hash.error = (jqXHR/*, textStatus, errorThrown*/) => {
          Ember.run(null, reject, this._ajaxError(jqXHR, jqXHR.responseText));
        };

        Ember.$.ajax(hash);
      }).then((params) => {
        const sessionKey = this.get('sessionKey');
        const session = this.get('session');
        const sessionPayload = params[sessionKey];

        assert(`Unable to find session key ${sessionKey} in payload ${params}`, sessionPayload);

        session.set('content', { token: sessionPayload.key });

        return this._returnSessionPayload(sessionPayload);
      });
    }
    else {
      return new Ember.RSVP.Promise((resolve, reject) => {
        reject();
      });
    }
  },

});
