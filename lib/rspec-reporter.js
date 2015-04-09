(function() {

  "use strict";

  var _ = require("underscore");

  /**
   * Create a function that reports results with 'table' and 'console'
   *
   * @param {function} table must be a function that prints formatted
   * rows of data to the console
   *
   * @param {function} console must be a function like the standard console.
   *
   * @returns {function} a function that reports data via table
   */
  function buildReport(table, console) {
    return function(result) {
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
        tableRows.push([fileNameAndLineNumber, "PASSED", success.successfulOnTry]);
      });
      console.log(table(tableRows));
      console.log("");
      console.log("");
    };
  }
  module.exports.buildReport = buildReport;
})();
