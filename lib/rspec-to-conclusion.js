(function() {

  "use strict";

  var debug = require("debug")("main");

  var _ = require("underscore");

  function specCounts(progress) {
    var result = {
      "passed": 0,
      "failed": 0,
      "pending": 0
    };
    _.values(progress).forEach(function(example) {
      if (example.status === "failed") {
        result.failed = result.failed + 1;
      } else if (example.status === "passed") {
        result.passed = result.passed + 1;
      } else if (example.status === "pending") {
        result.pending = result.pending + 1;
      }
    });
    return result;
  }

  function failedSpecCount(progress) {
    return progress.specsToRun.length;
  }

  function beginningState(targetSpecs) {
    return {
      "specsToRun": targetSpecs
    };
  }

  var write = function(s) {
    process.stdout.write(s);
  };

  function buildRSpecToConclusion(runAndSummarize) {

    return function(options) {

      var maximumRuns = options.maximumRuns,
          targetSpecs = options.specsToRun,
          summary = beginningState(targetSpecs),
          counts,
          run;

      debug("Maximum Runs: " + maximumRuns);
      debug("Target Specs: " + targetSpecs);

      for(run = 1; failedSpecCount(summary) !== 0 && run <= maximumRuns; run++) {
        write("Starting Run # " + run + ".. ");
        summary = runAndSummarize(run, summary);
        counts = specCounts(summary);
        write(counts.failed + " failing.");
        console.log();
      }

      return {
        results: summary,
        totalRuns: run - 1
      };
    };
  }

  module.exports.buildRSpecToConclusion = buildRSpecToConclusion;

})();
