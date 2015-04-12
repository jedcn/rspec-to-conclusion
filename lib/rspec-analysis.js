(function() {

  "use strict";

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

  module.exports.resultsToProgress = resultsToProgress;

})();
