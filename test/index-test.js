var assert = require("assert"),
    indexRequire = require("../index");

describe("index.js", function() {

  "use strict";

  it("exports exit", function() {
    assert.equal(typeof indexRequire.exit, "function");
  });

  it("exports report", function() {
    assert.equal(typeof indexRequire.report, "function");
  });

  it("exports verifyEnv", function() {
    assert.equal(typeof indexRequire.verifyEnv, "function");
  });

  it("exports verifyArgs", function() {
    assert.equal(typeof indexRequire.verifyArgs, "function");
  });

  it("exports rspecToConclusion", function() {
    assert.equal(typeof indexRequire.rspecToConclusion, "function");
  });

});
