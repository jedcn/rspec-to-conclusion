(function() {

  "use strict";

  var minimist = require("minimist");

  function parseArgs(argv) {
    return minimist(argv.slice(2), {
      "default": {
        "tries": 5
      }
    });
  }

  module.exports = parseArgs;

})();
