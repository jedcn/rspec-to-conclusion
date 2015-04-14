
var buildReport = require("./lib/report").buildReport,
    buildRSpecToConclusion = require("./lib/rspec-to-conclusion").buildRSpecToConclusion,
    buildRunAndSummarize = require("./lib/run-and-summarize").buildRunAndSummarize,
    buildVerifyArgs = require("./lib/verify-args").buildVerifyArgs,
    buildVerifyEnv = require("./lib/verify-env").buildVerifyEnv,
    minimist = require("minimist"),
    shelljs = require("shelljs"),
    table = require("gfm-table");

module.exports.exit = shelljs.exit;

module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which, console);

var runDebug = require("debug")("run");
var run = require("./lib/run").buildRun(shelljs.exec, require, runDebug);
var runAndSummarize = buildRunAndSummarize(run);

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
