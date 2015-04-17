(function() {

  "use strict";

  var debug = require("debug")("main");

  function startingProgress(targetSpecs) {
    return {
      "failingSpecs": targetSpecs,
      "examples": {},
      "summary": {}
    };
  }

  function buildRSpecToConclusion(runAndMerge) {

    return function(options) {

      var maximumRuns = options.maximumRuns,
          targetSpecs = options.specsToRun,
          progress = startingProgress(targetSpecs),
          run;

      debug("Maximum Runs: " + maximumRuns);
      debug("Target Specs: " + targetSpecs);

      for(run = 1; progress.failingSpecs.length !== 0 && run <= maximumRuns; run++) {
        process.stdout.write("Starting Run # " + run + ".. ");
        progress = runAndMerge(run, progress);
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
