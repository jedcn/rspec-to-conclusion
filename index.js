
var buildReport = require("./lib/rspec-reporter").buildReport,
    buildRSpecToConclusion = require("./lib/rspec-to-conclusion").buildRSpecToConclusion,
    buildVerifyArgs = require("./lib/rspec-verify-args").buildVerifyArgs,
    buildVerifyEnv = require("./lib/rspec-verify-env").buildVerifyEnv,
    minimist = require("minimist"),
    shelljs = require("shelljs"),
    table = require("gfm-table");


module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which);

var runDebug = require("debug")("run");
var rspecRunner = require("./lib/rspec-runner").buildRun(shelljs.exec, require, runDebug);
module.exports.rspecToConclusion = buildRSpecToConclusion(rspecRunner);

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
