import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel() {
    const superReturn = this._super(...arguments);

    if (superReturn.then) {
      return this._super(...arguments).then(() => {
        return this.get('session').close().catch(() => { /* noop */});
      });
    } else {
      return this.get('session').close().catch(() => { /* noop */});
    }
  }
});
