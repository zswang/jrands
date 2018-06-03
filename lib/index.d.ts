export declare class Random {
    sample: {
        (): number;
    };
    constructor(seed: number);
    /**
     * 获取下一个随机数
     * @example next():no bounds randoms
      ```js
      var random = new jrands.Random(234)
      for (var i = 0; i < 6; i++) {
        console.log(random.next())
      }
      // > 0.973766790225062
      // > 0.4772818756649652
      // > 0.3312124611489533
      // > 0.5038069484307462
      // > 0.8536962591361703
      // > 0.050971558341277555
      ```
     * @example next():upper bound randoms
      ```js
      var random = new jrands.Random(234)
      for (var i = 0; i < 6; i++) {
        console.log(random.next(2147483647))
      }
      // > 2091148258
      // > 1024955023
      // > 711273344
      // > 1081917183
      // > 1833298756
      // > 109460588
      ```
     * @example next():both bounds randoms
      ```js
      var random = new jrands.Random(234)
      for (var i = 0; i < 6; i++) {
        console.log(random.next(-2000000000, 2000000000))
      }
      // > 1895067160
      // > -90872498
      // > -675150156
      // > 15227793
      // > 1414785036
      // > -1796113767
      ```
     */
    next(lower?: number, upper?: number): number;
}
