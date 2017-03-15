import BaseToriiAdapter from 'ember-authenticate-me/torii-adapters/base';
import ENV from '../config/environment';

const SESSION_URI = ENV.emberAuthenticateMe.sessionUri || '/token_authenticate_me/api/v1/session';
const SESSION_KEY = ENV.emberAuthenticateMe.sessionKey || 'token_authenticate_me/session';

export default BaseToriiAdapter.extend({
  sessionUri: SESSION_URI,
  sessionKey: SESSION_KEY
});
