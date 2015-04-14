(function() {
  "use strict";
  function buildVerifyEnv(which) {
    return function() {
      var problems = [];
      if (!which("rspec")) {
        problems.push("Ack! I cannot rspec without `rspec`");
        problems.push("Do you see rspec when you type `which rspec`?");
      }
      return {
        problems: problems
      };
    };
  }
  module.exports.buildVerifyEnv = buildVerifyEnv;
})();
