(function (exportName) {

  /*<remove>*/
  'use strict';
  /*</remove>*/

  /*<jdists encoding="ejs" data="../package.json">*/
  /**
   * @file <%- name %>
   *
   * <%- description %>
   * @author
       <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
   *   <%- item.name %> (<%- item.url %>)
       <% }); %>
   * @version <%- version %>
       <% var now = new Date() %>
   * @date <%- [
        now.getFullYear(),
        now.getMonth() + 101,
        now.getDate() + 100
      ].join('-').replace(/-1/g, '-') %>
   */
  /*</jdists>*/

  /*<function name="create">*/
  /**
   * 创建一个随机生成器
   *
   * @see https://github.com/Microsoft/blob/master/referencesource/mscorlib/system/random.cs   *
   * @param {Number} seed 随机种子
   * @return {Function} 返回随机数生成函数
   * @example
   * ```js
   * var next = jrands(2); // var r = new Random(2);
   * var i = next() + next(); // var i = r.NextDouble() + r.NextDouble();
   * console.log(i);
   * ```
   */
  var jrands_mbig = 2147483647; // Int32.MaxValue;
  var jrands_mseed = 161803398;
  function create(seed) {
    if (typeof seed === 'undefined') {
      seed = Number(new Date() % jrands_mbig);
    }
    var inext;
    var inextp;
    var seedArray = [];
    var mj = jrands_mseed - Math.abs(seed);
    seedArray[55] = mj;
    var mk = 1;
    for (var i = 1; i < 55; i++) {
      var ii = (21 * i) % 55;
      seedArray[ii] = mk;
      mk = mj - mk;
      if (mk < 0) {
        mk += jrands_mbig;
      }
      mj = seedArray[ii];
    }
    for (var k = 1; k < 5; k++) {
      for (var j = 1; j < 56; j++) {
        seedArray[j] -= seedArray[1 + (j + 30) % 55];
        if (seedArray[j] < 0) {
          seedArray[j] += jrands_mbig;
        }
      }
    }
    inext = 0;
    inextp = 21;
    seed = 1;

    return function sample() {
      var result;
      if (++inext >= 56) {
        inext = 1;
      }
      if (++inextp >= 56) {
        inextp = 1;
      }
      result = seedArray[inext] - seedArray[inextp];

      if (result === jrands_mbig) {
        result--;
      }
      if (result < 0) {
        result += jrands_mbig;
      }
      seedArray[inext] = result;
      return result / jrands_mbig;
    };
  }
  /*</function>*/

  var exports = create;

  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function () {
        return exports;
      });
    }
  }
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
  else {
    window[exportName] = exports;
  }

})('jrands');