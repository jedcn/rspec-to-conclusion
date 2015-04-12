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

});
