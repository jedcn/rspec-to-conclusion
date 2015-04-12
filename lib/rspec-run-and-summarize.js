(function() {

  "use strict";

  var _ = require("underscore");

  var resultsToProgress = require("./rspec-analysis").resultsToProgress;

  function merge(overall, singleRun) {
    overall.examples = overall.examples || {};
    overall.summary = overall.summary || {};
    _.extend(overall.examples, singleRun.examples);
    _.extend(overall.summary, singleRun.summary);
    overall.failingSpecs = singleRun.failingSpecs;
    overall.summaryLine = singleRun.summaryLine;
    return overall;
  }

  function buildRunAndSummarize(rspecRunner) {

    return function(runNumber, progressSoFar) {
      var results = rspecRunner("rspecToConclusion-" + runNumber, progressSoFar.failingSpecs);
      var singleRunProgress = resultsToProgress(results, runNumber);
      return merge(progressSoFar, singleRunProgress);
    };

  }

  module.exports.buildRunAndSummarize = buildRunAndSummarize;

})();
