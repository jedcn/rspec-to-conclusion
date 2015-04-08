(function() {

  "use strict";

  var _ = require("underscore");

  /**
   * Summarizes result in a tabular format.
   *
   * @param {object} result ???
   * @param {function} table is a function that can build a tabular reporter
   */
  function report(result, table, console) {

    var tableRows = [];

    console.log("");
    console.log("");
    tableRows.push(["File Name and Line Number", "Result", "Tries"]);
    _.mapObject(result.failures, function(failure, fileNameAndLineNumber) {
      tableRows.push([fileNameAndLineNumber, "FAILED", result.totalRuns]);
    });
    _.mapObject(result.pending, function(pending, fileNameAndLineNumber) {
      tableRows.push([fileNameAndLineNumber, "PENDING", 0]);
    });
    _.mapObject(result.successes, function(success, fileNameAndLineNumber) {
      tableRows.push([fileNameAndLineNumber, "PASSED", success.successful_on_try]);
    });
    console.log(table(tableRows));
    console.log("");
    console.log("");
  }

  module.exports.report = report;

})();
