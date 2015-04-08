var index = require("./index.js");
for (var item in index)
  global[item] = index[item];
