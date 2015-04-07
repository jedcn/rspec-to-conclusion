(function() {

  "use strict";

  /**
   * Runs `rspec`.
   *
   * Uses the JSON and HTML formatters to save off results.
   *
   * Returns the parsed JSON run result.
   *
   * @param {string} resultsFile prefix of created files
   * @param {array} specs is a possibly empty array of specs to run
   * @param {function} exec is a function for synchronously running commands
   * @param {function} parseJSON is a function to synchronously parse JSON
   * @returns {object} The RSpec run result
   */
  function run(resultsFile, specs, exec, parseJSON) {
    var parsedResults,
        command = "rspec",
        rspecTarget = "spec",
        cwd = process.cwd();

    command = command + " --format html --out " + resultsFile + ".html";
    command = command + " --format json --out " + resultsFile + ".json ";

    if (specs && specs.length > 0) {
      rspecTarget = specs.join(" ");
    }
    command = command + rspecTarget;
    exec(command);
    parsedResults = parseJSON(cwd + "/" + resultsFile);
    return parsedResults;
  }

  module.exports.run = run;
})();
