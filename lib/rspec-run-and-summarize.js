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

  function decorateExamples(progress, runNumber) {
    _.each(_.values(progress), function(result) {
      if (result.status === "passed") {
        decorateSuccess(result, runNumber);
      }
    });
  }

  function buildProgressFromResults(results) {
    var progress = {};
    results.examples.forEach(function(result) {
      progress[keyForResult(result)] = result;
    });
    return progress;
  }

  function buildRunAndSummarize(rspecRunner) {

    function run(runNumber, specs) {
      //return mapWith(maybe(getWith('name')))(customerList);
      var results = rspecRunner("rspecToConclusion-" + runNumber, specs);
      var progress = buildProgressFromResults(results);
      decorateExamples(progress, runNumber);
      return progress;
    }

    return function(runNumber, progress) {
      var singleRunProgress = run(runNumber, progress.specsToRun);
      var mergedResults = merge(progress, singleRunProgress);
      //console.log(mergedResults);
      return mergedResults;
    };
  }

  module.exports.buildRunAndSummarize = buildRunAndSummarize;
  module.exports.keyForResult = keyForResult;
  module.exports.failingSpecs = failingSpecs;

})();
