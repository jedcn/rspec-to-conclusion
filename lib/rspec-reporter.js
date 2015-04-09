(function() {

  "use strict";

  var _ = require("underscore");

  function location(result) {
    return result.file_path + ":" + result.line_number;
  }

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
    return function(summary) {
      var tableRows = [],
          failures = [],
          pending = [],
          successes = [];

      _.each(_.values(summary.results), function(specResult) {
        var status = specResult.status;
        if (status === "passed") {
          successes.push(specResult);
        } else if (status === "failed") {
          failures.push(specResult);
        } else if (status === "pending") {
          pending.push(specResult);
        }
      });

      tableRows.push(["File Name and Line Number", "Result", "Tries"]);
      _.each(failures, function(result) {
        tableRows.push([location(result), "FAILURE", summary.totalRuns]);
      });
      _.each(successes, function(result) {
        tableRows.push([location(result), "PASSED", result.successfulOnTry]);
      });
      _.each(pending, function(result) {
        tableRows.push([location(result), "PENDING", 0]);
      });

      console.log("");
      console.log("");
      console.log(table(tableRows));
      console.log("");
      console.log("");
    };
  }
  module.exports.buildReport = buildReport;
})();
