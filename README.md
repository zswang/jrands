# jrands(#$)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]

## 概述

### jrands 是什么？

jrands 就是对 .NET 的 [Random Class](<https://msdn.microsoft.com/en-us/library/system.random(v=vs.110).aspx>) 做另一个简单实现

* JS 写法

```js
let random = new jrands.Random(2)
let i = random.next() + random.next()
console.log(i)
```

* 对应 C# 写法

```cs
var r = new Random(2);
var i = r.NextDouble() + r.NextDouble();
Console.Writeln(i);
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/jrands
[npm-image]: https://badge.fury.io/js/jrands.svg
[travis-url]: https://travis-ci.org/zswang/jrands
[travis-image]: https://travis-ci.org/zswang/jrands.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/jrands?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/jrands/badge.svg?branch=master&service=github
