
var buildReport = require("./lib/rspec-reporter").buildReport,
    buildVerifyArgs = require("./lib/rspec-verify-args").buildVerifyArgs,
    buildVerifyEnv = require("./lib/rspec-verify-env").buildVerifyEnv,
    minimist = require("minimist"),
    shelljs = require("shelljs"),
    table = require("gfm-table");

module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which);
module.exports.runToConclusion =
  require("./lib/rspec-to-conclusion").runToConclusion;

(function() {

  "use strict";

  function parseArgs(argv) {
    return minimist(argv.slice(2), {
      "default": {
        "tries": 5
      }
    });
  }
  module.exports.verifyArgs = buildVerifyArgs(parseArgs);
})();
