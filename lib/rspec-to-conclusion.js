(function() {

  "use strict";

  var _ = require("underscore");

  function keyForResult(result) {
    return result.file_path + ":" + result.line_number;
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

  function buildRSpecToConclusion(rspecRunner) {

    function runAndSummarize(runNumber, specs) {
      var summary = {},
          results;
      results = rspecRunner("rspecToConclusion-" + runNumber, specs);
      results.examples.forEach(function(result) {
        var resultKey = keyForResult(result);
        summary[resultKey] = result;
        if (result.status === "passed") {
          result.successfulOnTry = runNumber;
        }
      });
      return summary;
    }

    return function(options) {

      var maximumRuns = options.maximumRuns,
          overall = {},
          runSummary,
          runNumber,
          keepGoing = true,
          specsToTryNext = options.specsToRun;

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
    };
  }

  module.exports.buildRSpecToConclusion = buildRSpecToConclusion;

})();
