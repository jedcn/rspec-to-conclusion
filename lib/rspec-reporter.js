(function() {

  "use strict";

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
      var example,
          examples = summary.results.examples,
          tableRows = [];

      tableRows.push(["File Name and Line Number", "Result", "Tries"]);

      Object.keys(examples).forEach(function(specLocation) {
        example = examples[specLocation];
        if (example.status === "failed") {
          tableRows.push([specLocation, "FAILURE", summary.totalRuns]);
        }
      });

      Object.keys(examples).forEach(function(specLocation) {
        example = examples[specLocation];
        if (example.status === "passed") {
          tableRows.push([specLocation, "PASSED", example.successfulOnTry]);
        }
      });

      Object.keys(examples).forEach(function(specLocation) {
        example = examples[specLocation];
        if (example.status === "pending") {
          tableRows.push([specLocation, "PENDING", 0]);
        }
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
