(function() {

  "use strict";

  var _ = require("underscore"),
      shelljs = require("shelljs");

  var run =
      require("./rspec-runner").buildRun(shelljs.exec, require);

  function runAndSummarize(runNumber, specs) {
    var successes = {},
        failures = {},
        pending = {},
        results = run("rspecToConclusion-" + runNumber, specs, shelljs.exec, require);

    _.each(results.examples, function(result) {
      var resultKey = result.file_path + ":" + result.line_number;
      if (result.status === "passed") {
        successes[resultKey] = result;
      } else if (result.status === "failed") {
        failures[resultKey] = result;
      } else {
        pending[resultKey] = result;
      }
    });
    return {
      successes: successes,
      failures: failures,
      pending: pending
    };
  }

  function keyForResult(result) {
    return result.file_path + ":" + result.line_number;
  }

  function runToConclusion(maximumRuns) {

    var runResult,
        runNumber = 1,
        successes = {},
        failures = {},
        pending = {},
        keepGoing = true,
        specsToTryNext = [];

    function handleSuccess(result) {
      successes[keyForResult(result)] = result;
      result.successfulOnTry = runNumber;
    }

    function handlePending(result) {
      pending[keyForResult(result)] = result;
      result.successfulOnTry = null;
    }

    function handleFailure(result) {
      failures[keyForResult(result)] = result;
      specsToTryNext.push(keyForResult(result));
    }

    for(runNumber = 1; keepGoing && runNumber <= maximumRuns; runNumber++) {
      console.log("Run #" + runNumber + "..");
      runResult = runAndSummarize(runNumber, specsToTryNext);
      failures = {};
      specsToTryNext = [];
      _.each(runResult.successes, handleSuccess);
      _.each(runResult.pending, handlePending);
      _.each(runResult.failures, handleFailure);
      if (specsToTryNext.length === 0) {
        keepGoing = false;
      }
    }

    return {
      successes: successes,
      failures: failures,
      pending: pending,
      totalRuns: runNumber - 1
    };
  }

  module.exports.runToConclusion = runToConclusion;

})();
