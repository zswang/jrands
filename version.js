const fs = require('fs')
const path = require('path')

const filename = path.join(__dirname, 'package.json')
const pkg = JSON.parse(fs.readFileSync(filename))
pkg.version = pkg.version.replace(/-?\d+$/, value => {
  return parseInt(value) + 1
})
fs.writeFileSync(filename, JSON.stringify(pkg, null, '  '))

const bower_filename = path.join(__dirname, 'bower.json')
const bower_package = JSON.parse(fs.readFileSync(bower_filename))
bower_package.name = pkg.name
bower_package.description = pkg.description
bower_package.keywords = pkg.keywords
bower_package.version = pkg.version
fs.writeFileSync(bower_filename, JSON.stringify(bower_package, null, '  '))
