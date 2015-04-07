var assert = require("assert"),
    run = require("../lib/rspec-runner").run;

describe("run", function() {
  "use strict";
  describe("#run", function() {

    var execArgs,
        parseArgs,
        parseResult;

    beforeEach(function() {
      parseResult = parseArgs = execArgs = null;
    });

    function execStub() {
      execArgs = arguments;
    }

    function parseStub() {
      parseArgs = arguments;
      return parseResult;
    }

    it("runs rspec against 'spec' by default", function() {
      run("resultsFile", [], execStub, parseStub);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec$/));
    });

    it("runs rspec against the supplied specs", function() {
      run("resultsFile", ["spec/file1.rb", "spec/file2.rb"], execStub, parseStub);
      assert.ok(execArgs[0].match(/^rspec/));
      assert.ok(execArgs[0].match(/spec\/file1.rb spec\/file2.rb$/));
    });

    it("uses the JSON formatter and puts the results in a file", function() {
      run("resultsForRun1", [], execStub, parseStub);
      assert.ok(execArgs[0].match(/--format json --out resultsForRun1.json/));
    });

    it("uses the HTML formatter and puts the results in a file", function() {
      run("resultsForRun1", [], execStub, parseStub);
      assert.ok(execArgs[0].match(/--format html --out resultsForRun1.html/));
    });

    it("passes the JSON result file to parse", function() {
      run("resultsFile", [], execStub, parseStub);
      assert.ok(parseArgs[0].match(/resultsFile.json/));
    });

    it("returns JSON that was put into the resultsFile", function() {
      parseResult = "parseResult";
      var result = run("resultsFile", [], execStub, parseStub);
      assert.equal(result, "parseResult");
    });
  });
});
