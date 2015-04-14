(function() {

  "use strict";

  var resultsToProgress = require("./analysis").resultsToProgress,
      mergeProgress = require("./analysis").mergeProgress;

  function buildRunAndSummarize(run) {

    return function(runNumber, progressSoFar) {
      var results = run("rspecToConclusion-" + runNumber, progressSoFar.failingSpecs);
      var singleRunProgress = resultsToProgress(results, runNumber);
      return mergeProgress(progressSoFar, singleRunProgress);
    };

  }

  module.exports.buildRunAndSummarize = buildRunAndSummarize;

})();
