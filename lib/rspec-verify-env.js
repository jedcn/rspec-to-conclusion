(function() {
  "use strict";
  function buildVerifyEnv(which) {
    return function() {
      var ok = true;
      if (!which("rspec")) {
        console.log("Ack! I cannot rspec without `rspec`");
        console.log("Do you see rspec when you type `which rspec`?");
        ok = false;
      }
      return ok;
    };
  }
  module.exports.buildVerifyEnv = buildVerifyEnv;
})();
