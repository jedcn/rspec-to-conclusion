
var buildReport = require("./lib/rspec-reporter").buildReport,
    table = require("gfm-table");

module.exports.report = buildReport(table, console);

module.exports.runToConclusion =
  require("./lib/rspec-to-conclusion").runToConclusion;

module.exports.verifyPreConditions =
  require("./lib/rspec-pre-conditions").verifyPreConditions;
