// buildXXX methods: creates XXX by injecting dependencies:
var buildReport = require("./lib/report"),
    buildRSpecToConclusion = require("./lib/rspec-to-conclusion"),
    buildRunAndMerge = require("./lib/run-and-merge"),
    buildVerifyArgs = require("./lib/verify-args"),
    buildVerifyEnv = require("./lib/verify-env");

// External dependencies:
var shelljs = require("shelljs"),
    table = require("gfm-table");

var runDebug = require("debug")("run");

// Internal dependencies:
var resultsToProgress = require("./lib/analysis").resultsToProgress,
    mergeProgress = require("./lib/analysis").mergeProgress,
    parseArgs = require("./lib/parse-args");

var run = require("./lib/run")(shelljs.exec, require, runDebug);
var runAndMerge = buildRunAndMerge(run, resultsToProgress, mergeProgress);

// Exports for explicit use in ./bin/rspec-to-conclusion:
module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which);
module.exports.rspecToConclusion = buildRSpecToConclusion(runAndMerge);
module.exports.verifyArgs = buildVerifyArgs(parseArgs);
module.exports.exit = shelljs.exit;
