var assert = require("assert"),
    testModule = require("../lib/rspec-analysis");

var resultsToProgress = testModule.resultsToProgress;

describe("analysis", function() {

  "use strict";

  var sampleResults = {
    "examples": [
      {
        "description": "fails",
        "full_description": "always fail fails",
        "status": "pending",
        "file_path": "./spec/always_fail_spec.rb",
        "line_number": 2,
        "run_time": 0.000031
      },
      {
        "description": "passes",
        "full_description": "always pass passes",
        "status": "passed",
        "file_path": "./spec/always_pass_spec.rb",
        "line_number": 2,
        "run_time": 0.000467
      },
      {
        "description": "fails sometimes",
        "full_description": "flakey fails sometimes",
        "status": "failed",
        "file_path": "./spec/flakey_spec.rb",
        "line_number": 2,
        "run_time": 0.001089,
        "exception": {
          "class": "RSpec::Expectations::ExpectationNotMetError",
          "message": "expected: < 7\n     got:   9",
          "backtrace": [
            "not",
            "important"
          ]
        }
      }
    ],
    "summary": {
      "duration": 0.002386,
      "example_count": 8,
      "failure_count": 3,
      "pending_count": 2
    },
    "summary_line": "8 examples, 3 failures, 2 pending"
  };

  describe("#resultsToProgress", function() {

    it("creates a matching summaryLine", function() {
      var progress = resultsToProgress(sampleResults, 1);
      assert.equal(progress.summaryLine, "8 examples, 3 failures, 2 pending");
    });

    it("creates a matching summary", function() {
      var progress = resultsToProgress(sampleResults, 1),
          summary = progress.summary;
      assert.equal(Object.keys(summary).length, 4);
      assert.equal(summary.example_count, 8);
      assert.equal(summary.failure_count, 3);
      assert.equal(summary.pending_count, 2);
    });

    it("creates a map of examples", function() {
      var progress = resultsToProgress(sampleResults, 1),
          examples = progress.examples,
          keys;

      keys = Object.keys(examples);
      assert.equal(keys.length, 3);

      var expectedKeys = [ "./spec/always_fail_spec.rb:2",
                           "./spec/always_pass_spec.rb:2",
                           "./spec/flakey_spec.rb:2" ];

      assert.deepEqual(keys, expectedKeys);
    });

    it("augments successful examples with successfulOnTry", function() {
      var progress = resultsToProgress(sampleResults, 1),
          successfulExample;

      successfulExample = progress.examples["./spec/always_pass_spec.rb:2"];
      assert.equal(successfulExample.successfulOnTry, 1);
    });

    it("populates failingSpecs with a list of specs that failed", function() {
      var progress = resultsToProgress(sampleResults, 1);
      assert.deepEqual(["./spec/flakey_spec.rb:2"], progress.failingSpecs);
    });

  });
});
