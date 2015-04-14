(function() {

  "use strict";

  function buildVerifyArgs(parseArgs) {
    return function(args) {
      var specsToRun = ["spec"],
          argv = parseArgs(args);
      if (argv._.length > 0) {
        specsToRun = argv._;
      }
      return {
        maximumRuns: argv.tries,
        specsToRun: specsToRun
      };
    };
  }

  module.exports.buildVerifyArgs = buildVerifyArgs;

})();
