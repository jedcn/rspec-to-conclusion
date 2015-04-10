
var buildReport = require("./lib/rspec-reporter").buildReport,
    buildVerifyEnv = require("./lib/rspec-verify-env").buildVerifyEnv,
    table = require("gfm-table"),
    shelljs = require("shelljs");

module.exports.report = buildReport(table, console);
module.exports.verifyEnv = buildVerifyEnv(shelljs.which);

module.exports.runToConclusion =
  require("./lib/rspec-to-conclusion").runToConclusion;
