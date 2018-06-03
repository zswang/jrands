/*<function name="Random">*/
const jrands_mbig = 2147483647 // Int32.MaxValue;
const jrands_mseed = 161803398
export class Random {
  sample: {
    (): number
  }
  constructor(seed: number) {
    if (seed === undefined) {
      seed = Number(Date.now() % jrands_mbig)
    }
    let inext
    let inextp
    let seedArray = []
    let mj = jrands_mseed - Math.abs(seed)
    seedArray[55] = mj
    let mk = 1
    for (let i = 1; i < 55; i++) {
      let ii = (21 * i) % 55
      seedArray[ii] = mk
      mk = mj - mk
      if (mk < 0) {
        mk += jrands_mbig
      }
      mj = seedArray[ii]
    }
    for (let k = 1; k < 5; k++) {
      for (let j = 1; j < 56; j++) {
        seedArray[j] -= seedArray[1 + (j + 30) % 55]
        if (seedArray[j] < 0) {
          seedArray[j] += jrands_mbig
        }
      }
    }
    inext = 0
    inextp = 21
    seed = 1
    this.sample = () => {
      let result
      if (++inext >= 56) {
        inext = 1
      }
      if (++inextp >= 56) {
        inextp = 1
      }
      result = seedArray[inext] - seedArray[inextp]
      /* istanbul ignore if */
      if (result === jrands_mbig) {
        result--
      }
      if (result < 0) {
        result += jrands_mbig
      }
      seedArray[inext] = result
      return result / jrands_mbig
    }
  }
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
  next(lower?: number, upper?: number): number {
    if (lower === undefined) {
      return this.sample()
    }
    if (upper === undefined) {
      upper = lower
      lower = 0
    }
    return lower + Math.floor(this.sample() * (upper - lower))
  }
} /*</function>*/
