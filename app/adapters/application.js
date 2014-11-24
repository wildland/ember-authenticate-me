import AuthenticatedAdapter from 'ember-authenticate-me/adapters/authenticated';
import ENV from '../config/environment';

export default AuthenticatedAdapter.extend({
  namespace: ENV.apiNamespace || 'api/v1'
});
