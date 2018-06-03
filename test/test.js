let assert = require('should')
let jrands = require('../.')
let fs = require('fs')
let util = require('util')

// coverage

new jrands.Random()

describe('fixtures', () => {
  let items = fs
    .readdirSync('test/fixtures')
    .filter(item => {
      return /\.data$/.test(item)
    })
    .map(item => {
      return item.replace(/\.data$/, '')
    })

  items.forEach(item => {
    let data = String(fs.readFileSync(`test/fixtures/${item}.data`)).split(
      /\s+/
    )
    let seed = parseInt(item, 10)
    let random = new jrands.Random(seed)

    data.forEach((number, index) => {
      let n = random.next()
      it(util.format('%s(%d) -- %s:%j', item, index, number, n), () => {
        assert.ok(Math.abs(n - parseFloat(number)) < 1e-6)
      })
    })
  })
})
