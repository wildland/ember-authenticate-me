import BaseToriiAdapter from 'ember-authenticate-me/torii-adapters/base';
import ENV from '../config/environment';

var SESSION_URI = ENV.emberAuthenticateMe.sessionUri || '/token_authenticate_me/api/v1/session';

export default BaseToriiAdapter.extend({
  sessionUri: SESSION_URI
});
