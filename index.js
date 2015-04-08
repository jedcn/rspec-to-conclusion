module.exports.report =
  require("./lib/rspec-reporter").report;

module.exports.runToConclusion =
  require("./lib/rspec-to-conclusion").runToConclusion;

module.exports.verifyPreConditions =
  require("./lib/rspec-pre-conditions").verifyPreConditions;
