(function() {

  "use strict";

  var _ = require("underscore"),
      shelljs = require("shelljs");

  var run =
      require("./rspec-runner").buildRun(shelljs.exec, require);

  function keyForResult(result) {
    return result.file_path + ":" + result.line_number;
  }

  function runAndSummarize(runNumber, specs) {
    var summary = {},
        results;
    results = run("rspecToConclusion-" + runNumber, specs, shelljs.exec, require);
    results.examples.forEach(function(result) {
      var resultKey = keyForResult(result);
      summary[resultKey] = result;
      if (result.status === "passed") {
        result.successfulOnTry = runNumber;
      }
    });
    return summary;
  }

  function analyzeRunSummary(overall, runSummary) {
    var specsToTryNext = [];
    _.extend(overall, runSummary);
    _.values(runSummary).forEach(function(result) {
      if (result.status === "failed") {
        specsToTryNext.push(keyForResult(result));
      }
    });
    return specsToTryNext;
  }

  function runToConclusion(maximumRuns) {

    var overall = {},
        runSummary,
        runNumber,
        keepGoing = true,
        specsToTryNext;

    for(runNumber = 1; keepGoing && runNumber <= maximumRuns; runNumber++) {
      console.log("Run #" + runNumber + "..");
      runSummary = runAndSummarize(runNumber, specsToTryNext);
      specsToTryNext = analyzeRunSummary(overall, runSummary);
      keepGoing = specsToTryNext.length !== 0;
    }
    return {
      results: overall,
      totalRuns: runNumber - 1
    };
  }

  module.exports.runToConclusion = runToConclusion;

})();
