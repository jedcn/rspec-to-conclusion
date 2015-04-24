var assert = require("assert"),
    buildReport = require("../lib/report");

describe("report", function() {

  "use strict";

  var sampleProgress = {
    "examples": {
      "./spec/always_fail_spec.rb:2": {
        "description": "fails",
        "full_description": "always fail fails",
        "status": "pending",
        "file_path": "./spec/always_fail_spec.rb",
        "line_number": 2,
        "run_time": 0.000031
      },
      "./spec/always_pass_spec.rb:2": {
        "description": "passes",
        "full_description": "always pass passes",
        "status": "passed",
        "file_path": "./spec/always_pass_spec.rb",
        "line_number": 2,
        "run_time": 0.000467,
        "successfulOnTry": 1
      },
      "./spec/flakey_spec.rb:2": {
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
    },
    "summary": {
      "duration": 0.002386,
      "example_count": 3,
      "failure_count": 1,
      "pending_count": 1
    },
    "summary_line": "3 examples, 1 failures, 1 pending"
  };

  describe("#report", function() {

    var tableArgs;
    var tableStub = function() {
      tableArgs = arguments;
      return "asciiTable";
    };

    var consoleArgs = [];
    var consoleStub = {
      "log": function() {
        consoleArgs.push(arguments);
      }
    };

    var report = buildReport(tableStub, consoleStub);

    var expectedArgs = [
      [ "File Name and Line Number", "Result", "Tries" ],
      [ "./spec/always_fail_spec.rb:2", "PENDING", 0 ],
      [ "./spec/always_pass_spec.rb:2", "PASSED", 1 ],
      [ "./spec/flakey_spec.rb:2", "FAILURE", 1 ]
    ];

    report({
      results: sampleProgress,
      totalRuns: 1
    });

    assert.deepEqual(tableArgs[0], expectedArgs);
    assert.equal(consoleArgs[2][0], "asciiTable");
  });
});
