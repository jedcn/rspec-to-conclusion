var assert = require("assert"),
    run = require("../lib/rspec-runner").run;

describe("run", function() {
  "use strict";
  describe("#run", function() {

    var execArgs,
        requireArgs,
        requireResult;

    beforeEach(function() {
      requireResult = requireArgs = execArgs = null;
    });

    function execStub() {
      execArgs = arguments;
    }

    function requireStub() {
      requireArgs = arguments;
      return requireResult;
    }

    it("runs rspec against 'spec' by default", function() {
      run("resultsFile", [], execStub, requireStub);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec$/));
    });

    it("runs rspec against the supplied specs", function() {
      run("resultsFile", ['spec/file1.rb', 'spec/file2.rb'], execStub, requireStub);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec\/file1.rb spec\/file2.rb$/));
    });

    it("uses the JSON formatter and puts the results in a file", function() {
      run("resultsForRun1", [], execStub, requireStub);
      assert.ok(execArgs[0].match(/--format json --out resultsForRun1.json/));
    });

    it("uses the HTML formatter and puts the results in a file", function() {
      run("resultsForRun1", [], execStub, requireStub);
      assert.ok(execArgs[0].match(/--format html --out resultsForRun1.html/));
    });

    it("returns what comes back from requiring in the resultsFile", function() {
      requireResult = "requireResult";
      var result = run("resultsFile", [], execStub, requireStub);
      assert.equal(result, "requireResult");
    });
  });
});
