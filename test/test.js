var assert = require('should');
var jrands = require('../.');
var fs = require('fs');
var util = require('util');

// coverage

jrands();

describe('fixtures', function () {
  var items = fs.readdirSync('test/fixtures').filter(function (item) {
    return /\.data$/.test(item);
  }).map(function (item) {
    return item.replace(/\.data$/, '');
  });

  items.forEach(function (item) {
    var data = String(fs.readFileSync(util.format('test/fixtures/%s.data', item))).split(/\s+/);
    var seed = parseInt(item, 10);
    var next = jrands(seed);
    console.log(seed);

    data.forEach(function (number, index) {
      var n = next();
      it(util.format('%s(%d) -- %s:%j', item, index, number, n), function () {
        assert.ok(Math.abs(n - parseFloat(number)) < 1e-6);
      });
    });

  });
});