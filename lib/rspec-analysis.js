(function() {

  "use strict";

  var _ = require("underscore");

  function keyFor(example) {
    return example.file_path + ":" + example.line_number;
  }

  function resultsToProgress(results, runNumber) {
    var examplesMap = {},
        failingSpecsList = [],
        progress = {
          "summaryLine": results.summary_line,
          "summary": results.summary,
          "examples": examplesMap,
          "failingSpecs": failingSpecsList
        };
    results.examples.forEach(function(example) {
      examplesMap[keyFor(example)] = example;
      if (example.status === "passed") {
        example.successfulOnTry = runNumber;
      } else if (example.status === "failed") {
        failingSpecsList.push(keyFor(example));
      }
    });
    return progress;
  }

  function mergeProgress(oldProgress, newProgress) {
    _.extend(oldProgress.examples, newProgress.examples);
    _.extend(oldProgress.summary, newProgress.summary);
    oldProgress.failingSpecs = newProgress.failingSpecs;
    oldProgress.summaryLine = newProgress.summaryLine;
    return oldProgress;
  }

  module.exports.resultsToProgress = resultsToProgress;
  module.exports.mergeProgress = mergeProgress;

})();
