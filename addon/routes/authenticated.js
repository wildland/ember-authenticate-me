import Ember from 'ember';
import RouteAuthenticatedMixin from 'ember-authenticate-me/mixins/routes/authenticated';

var AuthenticatedRoute = Ember.Route.extend(RouteAuthenticatedMixin);

export default AuthenticatedRoute;
