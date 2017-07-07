import Ember from 'ember';
import layout from '../templates/components/forgot-password-form';
import getConfig from 'ember-authenticate-me/configuration';

export function forgotPassword(email) {
  const emberAuthenticateMeConfig = getConfig();
  const PASSWORD_RESET_URI = emberAuthenticateMeConfig.passwordResetUri ||
    '/api/password_resets';

  return new Ember.RSVP.Promise((resolve, reject) => {
    const ajaxHash = {
      type: "POST",
      url: PASSWORD_RESET_URI,
      data: {
        email
      },
    };

    ajaxHash.success = (...args) => {
      resolve(...args);
    };

    ajaxHash.error = (...args) => {
      reject(...args);
    };

    Ember.$.ajax(ajaxHash);
  });
}

export default Ember.Component.extend({
  layout,
  tagName: '',

  requestSent: false,
  _isSending: false,

  resetRequestCompleted() {
    if (!this.isDestroyed) {
      this.setProperties({
        requestSent: true,
      });
    }
  },

  forgotPassword,

  actions: {
    resetPassword(email) {
      this.set('_isSending', true);

      this.set('errors', null);

      return this.forgotPassword(email).then((rval) => {
        this.resetRequestCompleted();

        return rval;
      }).catch((e) => {
        if (!this.isDestroyed) {
          try {
            const errorResponse = JSON.parse(e.responseText);

            this.set('errors', errorResponse.errors);
          } catch(parseError) {
            this.set('errors', {});
          }
        }

        throw e;
      }).finally(() => {
        if (!this.isDestroyed) {
          this.set('_isSending', false);
        }
      });
    }
  }
});
