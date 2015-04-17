var assert = require("assert");

describe("requiring global.js", function() {

  "use strict";

  require("../global");

  it("defines exit", function() {
    assert.equal(typeof exit, "function");
  });

  it("exports report", function() {
    assert.equal(typeof report, "function");
  });

  it("exports verifyEnv", function() {
    assert.equal(typeof verifyEnv, "function");
  });

  it("exports verifyArgs", function() {
    assert.equal(typeof verifyArgs, "function");
  });

  it("exports rspecToConclusion", function() {
    assert.equal(typeof rspecToConclusion, "function");
  });

});
