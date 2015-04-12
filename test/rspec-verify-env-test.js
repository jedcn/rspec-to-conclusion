var assert = require("assert"),
    buildVerifyEnv = require("../lib/rspec-verify-env").buildVerifyEnv;

describe("rspec-verify-env", function() {

  "use strict";

  describe("#verifyEnv", function() {

    var whichArgs, logArgs;

    beforeEach(function() {
      whichArgs = null;
      logArgs = null;
    });

    var consoleStub = {
      log: function() {
        logArgs = arguments;
      }
    };

    it("returns true if it finds rspec", function() {
      function whichStub() {
        whichArgs = arguments;
        return true;
      }
      var verifyEnv = buildVerifyEnv(whichStub, consoleStub);
      var result = verifyEnv();
      assert.equal(whichArgs[0], "rspec");
      assert.equal(result, true);
    });

    it("returns false and prints if it cannot find rspec", function() {
      function whichStub() {
        whichArgs = arguments;
        return false;
      }
      var verifyEnv = buildVerifyEnv(whichStub, consoleStub);
      var result = verifyEnv();
      assert.equal(whichArgs[0], "rspec");
      assert.equal(logArgs[0], "Do you see rspec when you type `which rspec`?");
      assert.equal(result, false);
    });

  });
});
