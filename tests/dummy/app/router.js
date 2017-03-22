import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('sign-up');
  this.route('forgot-password');
  this.route('reset-password', { path: '/reset-password/:token' });
  this.route('edit-account', { path: '/edit-account/:user_id' });
});

export default Router;
