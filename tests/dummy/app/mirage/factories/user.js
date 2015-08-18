import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  id(i) {
    return i + 1;
  },
  username(i) {
    return `user${i}`;
  },
  password: 'password',
  email(i) {
    return `email${i}@test.com`;
  },
  createdAt() {
    return new Date().toISOString();
  },
  updatedAt() {
    return new Date().toISOString();
  },
  sessionKey(i) {
    return `session-key-${i}`;
  },
  sessionExpiration() { //expire in a day by default
    var date = new Date();

    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }
});
