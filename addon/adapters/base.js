import AuthenticatedAdapter from 'ember-authenticate-me/adapters/authenticated';
import Ember from 'ember';

export default AuthenticatedAdapter.extend({
  namespace: 'token_authenticate_me/api/v1',

  pathForType(modelName) {
    const modelNameSplit = modelName.split('/');
    const underscored = Ember.String.underscore(
      (modelNameSplit.length === 2 ? modelNameSplit[1] : modelNameSplit[0])
    );

    return Ember.String.pluralize(underscored);
  }
});
