var assert = require("assert"),
    parseArgs = require("../lib/parse-args"),
    buildVerifyArgs = require("../lib/verify-args");

describe("#verifyEnv", function() {

  "use strict";

  var verifyArgs = buildVerifyArgs(parseArgs);

  describe("defaults: when nothing is supplied", function() {

    var argsWithNoOptions = [ "node",
                              "/projects/rtc/bin/rspec-to-conclusion" ];

    it("returns .maximumRuns == 5", function() {
      var result = verifyArgs(argsWithNoOptions);
      assert.equal(result.maximumRuns, 5);
    });

    it("returns .specsToRun == 'spec'", function() {
      var result = verifyArgs(argsWithNoOptions);
      assert.deepEqual(result.specsToRun, [ "spec" ]);
    });

  });

  describe("not just the defaults: --tries N and targets", function() {

    it("returns .maximumRuns == '--tries'", function() {
      var argsWithTenTries = [ "node",
                               "/projects/rtc/bin/rspec-to-conclusion",
                               "--tries",
                               "10"
                             ];
      var result = verifyArgs(argsWithTenTries);
      assert.deepEqual(result.maximumRuns, 10);
    });

    it("returns .specsToRun == remaining options", function() {
      var argsWithSpecTargets = [ "node",
                                  "/projects/rtc/bin/rspec-to-conclusion",
                                  "targetA",
                                  "targetB"
                                ];
      var result = verifyArgs(argsWithSpecTargets);
      assert.deepEqual(result.specsToRun, [ "targetA", "targetB" ]);
    });
  });
});
