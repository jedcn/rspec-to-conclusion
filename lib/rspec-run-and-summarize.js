(function() {

  "use strict";

  var _ = require("underscore");

  function keyForResult(result) {
    return result.file_path + ":" + result.line_number;
  }

  function failingSpecs(progress) {
    var failing = [];
    _.values(progress).forEach(function(result) {
      if (result.status === "failed") {
        failing.push(keyForResult(result));
      }
    });
    return failing;
  }

  function merge(progress, singleRunProgress) {
    _.extend(progress, singleRunProgress);
    progress.specsToRun = failingSpecs(progress);
    return progress;
  }

  function decorateSuccess(result, runNumber) {
    result.successfulOnTry = runNumber;
  }

  function decorateExamples(examples, runNumber) {
    examples.forEach(function(result) {
      if (result.status === "passed") {
        decorateSuccess(result, runNumber);
      }
    });
  }

  function buildProgressFromResults(results) {
    results.examples.forEach(function(result) {
      results[keyForResult(result)] = result;
    });
    return results;
  }

  function buildRunAndSummarize(rspecRunner) {

    function run(runNumber, specs) {
      var results = rspecRunner("rspecToConclusion-" + runNumber, specs);
      decorateExamples(results.examples, runNumber);
      return buildProgressFromResults(results);
    }

    return function(runNumber, progress) {
      var singleRunResults = run(runNumber, progress.specsToRun);
      var mergedResults = merge(progress, singleRunResults);
      return mergedResults;
    };
  }

  module.exports.buildRunAndSummarize = buildRunAndSummarize;
  module.exports.keyForResult = keyForResult;
  module.exports.failingSpecs = failingSpecs;

})();
