/* global module */

module.exports = {
  afterInstall: function(options) {
    return this.addPackageToProject("torii", "^0.2");
  },

  normalizeEntityName: function() {}
};
