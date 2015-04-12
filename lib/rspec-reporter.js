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

      _.values(summary.results.examples).forEach(function(specResult) {
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
      failures.forEach(function(f) {
        tableRows.push([location(f), "FAILURE", summary.totalRuns]);
      });
      successes.forEach(function(s) {
        tableRows.push([location(s), "PASSED", s.successfulOnTry]);
      });
      pending.forEach(function(p) {
        tableRows.push([location(p), "PENDING", 0]);
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
