import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forgot-password-form', 'Integration | Component | forgot password form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forgot-password-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forgot-password-form}}
      template block text
    {{/forgot-password-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
