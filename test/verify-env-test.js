var assert = require("assert"),
    buildVerifyEnv = require("../lib/verify-env");

describe("#verifyEnv", function() {

  "use strict";

  var whichArgs;

  beforeEach(function() {
    whichArgs = null;
  });

  it("returns .problems == [] if it finds rspec", function() {
    function whichStub() {
      whichArgs = arguments;
      return true;
    }
    var verifyEnv = buildVerifyEnv(whichStub);
    var result = verifyEnv();
    assert.equal(whichArgs[0], "rspec");
    assert.deepEqual(result.problems, []);
  });

  it("returns false and prints if it cannot find rspec", function() {
    function whichStub() {
      whichArgs = arguments;
      return false;
    }
    var verifyEnv = buildVerifyEnv(whichStub);
    var result = verifyEnv();
    assert.equal(whichArgs[0], "rspec");
    var expectedProblems = [ "Ack! I cannot rspec without `rspec`",
                             "Do you see rspec when you type `which rspec`?" ];
    assert.deepEqual(result.problems, expectedProblems);
  });

});
