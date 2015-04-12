
var buildReport = require("./lib/rspec-reporter").buildReport,
    buildRSpecToConclusion = require("./lib/rspec-to-conclusion").buildRSpecToConclusion,
    buildRunAndSummarize = require("./lib/rspec-run-and-summarize").buildRunAndSummarize,
    buildVerifyArgs = require("./lib/rspec-verify-args").buildVerifyArgs,
    buildVerifyEnv = require("./lib/rspec-verify-env").buildVerifyEnv,
    minimist = require("minimist"),
    shelljs = require("shelljs"),
    table = require("gfm-table");


module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which);

var runDebug = require("debug")("run");
var rspecRunner = require("./lib/rspec-runner").buildRun(shelljs.exec, require, runDebug);
var runAndSummarize = buildRunAndSummarize(rspecRunner);

module.exports.rspecToConclusion = buildRSpecToConclusion(runAndSummarize);

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
