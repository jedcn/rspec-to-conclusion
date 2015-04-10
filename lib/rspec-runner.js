(function() {

  "use strict";

  /**
   * Create a function that runs `rspec` against specs.
   *
   * @param {function} exec must be a function for synchronously
   * running commands
   *
   * @param {function} parse must be a function to synchronously parse
   * JSON
   *
   * @returns {function} a function that can run rspec
   */
  function buildRun(exec, parse) {

    /**
     * Runs 'rspec' against specs.
     *
     * Creates JSON and HTML files using core rspec formatters. These
     * files are prefixed with filePrefix.
     *
     * @param {string} filePrefix of created files
     *
     * @param {array} specs is a possibly empty array of specs to run
     *
     * @returns {object} The results of a single 'rspec' run
     */
    return function(filePrefix, specs) {
      var parsedResults,
          command,
          rspecTarget = specs.join(" "),
          cwd = process.cwd();

      command = "rspec ";
      command = command + "--format html --out " + filePrefix + ".html ";
      command = command + "--format json --out " + filePrefix + ".json ";
      command = command + rspecTarget;
      exec(command);
      parsedResults = parse(cwd + "/" + filePrefix + ".json");
      return parsedResults;
    };
  }

  module.exports.buildRun = buildRun;

})();
