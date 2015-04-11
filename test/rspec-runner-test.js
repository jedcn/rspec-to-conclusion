var assert = require("assert"),
    buildRun = require("../lib/rspec-runner").buildRun;

describe("run", function() {

  "use strict";

  describe("#run", function() {

    var execArgs,
        debugArgs,
        parseArgs,
        parseResult;

    function execStub() {
      execArgs = arguments;
    }

    function parseStub() {
      parseArgs = arguments;
      return parseResult;
    }

    function debugStub() {
      debugArgs = arguments;
    }

    var run = buildRun(execStub, parseStub, debugStub);

    beforeEach(function() {
      parseResult = parseArgs = execArgs = null;
    });

    it("can run rspec against the 'spec' directory", function() {
      run("resultsFile", ["spec"]);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec$/));
    });

    it("runs rspec against the supplied specs", function() {
      run("resultsFile", ["spec/file1.rb", "spec/file2.rb"]);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec\/file1.rb spec\/file2.rb$/));
    });

    it("emits debug information about the command being run", function() {
      run("resultsFile", ["spec"]);
      assert.ok(debugArgs[0].match(/^running 'rspec/));
      assert.ok(debugArgs[0].match(/spec'$/));
    });

    it("uses the JSON formatter and puts the results in a file", function() {
      run("resultsForRun1", ["spec"]);
      assert.ok(execArgs[0].match(/--format json --out resultsForRun1.json/));
    });

    it("uses the HTML formatter and puts the results in a file", function() {
      run("resultsForRun1", ["spec"]);
      assert.ok(execArgs[0].match(/--format html --out resultsForRun1.html/));
    });

    it("passes the JSON result file to parse", function() {
      run("resultsFile", ["spec"]);
      assert.ok(parseArgs[0].match(/resultsFile.json/));
    });

    it("returns JSON that was put into the resultsFile", function() {
      parseResult = "parseResult";
      var result = run("resultsFile", ["spec"]);
      assert.equal(result, "parseResult");
    });
  });
});
