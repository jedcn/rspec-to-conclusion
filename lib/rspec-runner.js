/**
 * Runs `rspec` via exec.
 *
 * Uses the JSON formatter to save off results.
 *
 * @param {number} runNumber keeps the result file names unique
 * @param {string} exec is a call back for running rspec
 * @returns {object} The RSpec run result
 */
function run(resultsFile, specs, exec, require) {
  "use strict";
  var parsedResults,
      command = "rspec --format json --out " + resultsFile + " ",
      cwd = process.cwd();

  if (specs && specs.length > 0) {
    command = command + specs.join(" ");
  } else {
    command = command + "spec";
  }
  exec(command);
  parsedResults = require(cwd + "/" + resultsFile);
  return parsedResults;
}

module.exports.run = run;
