(function() {

  "use strict";

  var debug = require("debug")("main");

  function failedSpecCount(progress) {
    return progress.specsToRun.length;
  }

  function beginningState(targetSpecs) {
    return {
      "specsToRun": targetSpecs
    };
  }

  function buildRSpecToConclusion(runAndSummarize) {

    return function(options) {

      var maximumRuns = options.maximumRuns,
          targetSpecs = options.specsToRun,
          summary = beginningState(targetSpecs),
          run;

      debug("Maximum Runs: " + maximumRuns);
      debug("Target Specs: " + targetSpecs);

      for(run = 1; failedSpecCount(summary) !== 0 && run <= maximumRuns; run++) {
        console.log("Run # " + run);
        summary = runAndSummarize(run, summary);

        debug(summary.specsToRun);
      }

      return {
        results: summary,
        totalRuns: run - 1
      };
    };
  }

  module.exports.buildRSpecToConclusion = buildRSpecToConclusion;

})();
