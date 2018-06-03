const jrands = require('../')


describe("src/index.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("next():no bounds randoms", function () {
    examplejs_printLines = [];
    var random = new jrands.Random(234)
    for (var i = 0; i < 6; i++) {
      examplejs_print(random.next())
    }
    assert.equal(examplejs_printLines.join("\n"), "0.973766790225062\n0.4772818756649652\n0.3312124611489533\n0.5038069484307462\n0.8536962591361703\n0.050971558341277555"); examplejs_printLines = [];
  });
          
  it("next():upper bound randoms", function () {
    examplejs_printLines = [];
    var random = new jrands.Random(234)
    for (var i = 0; i < 6; i++) {
      examplejs_print(random.next(2147483647))
    }
    assert.equal(examplejs_printLines.join("\n"), "2091148258\n1024955023\n711273344\n1081917183\n1833298756\n109460588"); examplejs_printLines = [];
  });
          
  it("next():both bounds randoms", function () {
    examplejs_printLines = [];
    var random = new jrands.Random(234)
    for (var i = 0; i < 6; i++) {
      examplejs_print(random.next(-2000000000, 2000000000))
    }
    assert.equal(examplejs_printLines.join("\n"), "1895067160\n-90872498\n-675150156\n15227793\n1414785036\n-1796113767"); examplejs_printLines = [];
  });
          
});
         