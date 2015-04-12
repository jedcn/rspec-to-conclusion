var assert = require("assert"),
    testModule = require("../lib/rspec-run-and-summarize");

var keyForResult = testModule.keyForResult,
    failingSpecs = testModule.failingSpecs;

describe("run-and-summarize", function() {

  "use strict";

  var sampleResults = {
    "examples": [ {
      "file_path": "./spec/one_spec.rb",
      "line_number": 10,
      "status": "passed"
    }, {
      "file_path": "./spec/two_spec.rb",
      "line_number": 20,
      "status": "failed"
    }, {
      "file_path": "./spec/three_spec.rb",
      "line_number": 30,
      "status": "failed"
    } ]
  };

  describe("#keyForResult", function() {
    it("concatenates file_path and line_number", function() {
      var result = keyForResult(sampleResults.examples[0]);
      assert.equal(result, "./spec/one_spec.rb:10");
    });
  });

  describe("#failingSpecs", function() {
    it("returns an array of failing specs", function() {
      var result = failingSpecs(sampleResults.examples);
      assert.equal(result.length, 2);
      assert.equal(result[0], "./spec/two_spec.rb:20");
      assert.equal(result[1], "./spec/three_spec.rb:30");
    });

  });

});
