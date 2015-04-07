(function() {

  "use strict";

  /**
   * Runs `rspec`.
   *
   * Uses the JSON and HTML formatters to save off results.
   *
   * Returns the parsed JSON run result.
   *
   * @param {string} filePrefix prefix of created files
   * @param {array} specs is a possibly empty array of specs to run
   * @param {function} exec is a function for synchronously running commands
   * @param {function} parse is a function to synchronously parse JSON
   * @returns {object} The RSpec run result
   */
  function run(filePrefix, specs, exec, parse) {
    var parsedResults,
        command,
        rspecTarget = "spec",
        cwd = process.cwd();

    command = "rspec ";
    command = command + "--format html --out " + filePrefix + ".html ";
    command = command + "--format json --out " + filePrefix + ".json ";

    if (specs && specs.length > 0) {
      rspecTarget = specs.join(" ");
    }
    command = command + rspecTarget;
    exec(command);
    parsedResults = parse(cwd + "/" + filePrefix + ".json");
    return parsedResults;
  }

  module.exports.run = run;

})();
