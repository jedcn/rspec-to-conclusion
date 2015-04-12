(function() {

  "use strict";

  var resultsToProgress = require("./rspec-analysis").resultsToProgress,
      mergeProgress = require("./rspec-analysis").mergeProgress;

  function buildRunAndSummarize(rspecRunner) {

    return function(runNumber, progressSoFar) {
      var results = rspecRunner("rspecToConclusion-" + runNumber, progressSoFar.failingSpecs);
      var singleRunProgress = resultsToProgress(results, runNumber);
      return mergeProgress(progressSoFar, singleRunProgress);
    };

  }

  module.exports.buildRunAndSummarize = buildRunAndSummarize;

})();
