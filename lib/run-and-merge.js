(function() {

  "use strict";

  function filePrefix(i) {
    return "rspecToConclusion-" + i;
  }

  function buildRunAndMerge(run, resultsToProgress, mergeProgress) {

    return function(num, ongoingProgress) {
      var results,
          newProgress;
      results = run(filePrefix(num), ongoingProgress.failingSpecs);
      newProgress = resultsToProgress(results, num);
      return mergeProgress(ongoingProgress, newProgress);
    };

  }

  module.exports.buildRunAndMerge = buildRunAndMerge;

})();
