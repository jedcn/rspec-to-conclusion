(function() {
  "use strict";
  var shelljs = require("shelljs");
  function verifyPreConditions() {
    var ok = true;
    if (!shelljs.which("rspec")) {
      console.log("Ack! I can\"t rspec without `rspec`");
      console.log("Do you see rspec when you type `which rspec`?");
      ok = false;
    }
    return ok;
  }
  module.exports.verifyPreConditions = verifyPreConditions;
})();
