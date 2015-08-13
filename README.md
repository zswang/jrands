# jrands(#$)

[![Build Status](https://img.shields.io/travis/zswang/jrands/master.svg)](https://travis-ci.org/zswang/jrands)
[![NPM version](https://img.shields.io/npm/v/jrands.svg)](http://badge.fury.io/js/jrands)

## 概述

### jrands 是什么？

jrands 就是对 .NET 的 Random 做另一个简单实现

+ JS 写法

```js
var next = jrands(2);
var i = next() + next();
console.log(i);
```

+ 对应 C# 写法
```cs
var r = new Random(2);
var i = r.NextDouble() + r.NextDouble();
Console.Writeln(i);
```