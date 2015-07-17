import Ember from 'ember';
import RoutesAuthenticatedMixin from '../../../mixins/routes/authenticated';
import { module, test } from 'qunit';

module('RoutesAuthenticatedMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RoutesAuthenticatedObject = Ember.Object.extend(RoutesAuthenticatedMixin);
  var subject = RoutesAuthenticatedObject.create();
  assert.ok(subject);
});
