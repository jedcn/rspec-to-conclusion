(function() {

  "use strict";

  var debug = require("debug")("main");

  function failedSpecCount(progress) {
    return progress.failingSpecs.length;
  }

  function beginningProgress(targetSpecs) {
    return {
      "failingSpecs": targetSpecs
    };
  }

  var write = function(s) {
    process.stdout.write(s);
  };

  function buildRSpecToConclusion(runAndSummarize) {

    return function(options) {

      var maximumRuns = options.maximumRuns,
          targetSpecs = options.specsToRun,
          progress = beginningProgress(targetSpecs),
          run;

      debug("Maximum Runs: " + maximumRuns);
      debug("Target Specs: " + targetSpecs);

      for(run = 1; failedSpecCount(progress) !== 0 && run <= maximumRuns; run++) {
        write("Starting Run # " + run + ".. ");
        progress = runAndSummarize(run, progress);
        console.log(progress.summaryLine);
      }

      return {
        results: progress,
        totalRuns: run - 1
      };
    };
  }

  module.exports.buildRSpecToConclusion = buildRSpecToConclusion;

})();
