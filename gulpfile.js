/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const typescript = require('gulp-typescript')
const jdists = require('gulp-jdists')
const examplejs = require('gulp-examplejs')
const uglify = require('gulp-uglify')
const merge2 = require('merge2')
const replace = require('gulp-replace')
const rename = require('gulp-rename')

gulp.task('build', () => {
  let tsResult = gulp
    .src('./src/*.ts')
    .pipe(jdists())
    .pipe(gulp.dest('./lib'))
    .pipe(
      typescript({
        target: 'ES5',
        declaration: true,
        module: 'umd',
      })
    )

  return merge2([
    tsResult.dts.pipe(gulp.dest('lib')),
    tsResult.js
      .pipe(
        replace(
          /(\(function\s*\()(factory\)\s*\{)/,
          '$1root, $2\n    /* istanbul ignore next */'
        )
      )
      .pipe(
        replace(/^\s*var\s+__assign\s+=\s+/m, '/* istanbul ignore next */\n$&')
      )
      .pipe(
        replace(
          /(\s*\}\s*\)\s*\()(function\s*\(require,\s*exports\)\s*\{)/,
          '$1this, $2'
        )
      )
      .pipe(
        replace(
          /(\s*\}\s*\)\s*\()(function\s*\(require,\s*exports\)\s*\{)/,
          '$1this, $2'
        )
      )
      .pipe(gulp.dest('lib')),
  ])
})

gulp.task('uglify', () => {
  gulp
    .src(`lib/index.js`)
    .pipe(uglify())
    .pipe(rename(`index.min.js`))
    .pipe(gulp.dest('lib'))
})

gulp.task('example', function example() {
  return gulp
    .src('src/**.ts')
    .pipe(
      jdists({
        trigger: 'example',
      })
    )
    .pipe(
      examplejs({
        header: `const jrands = require('../')\n`,
      })
    )
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['build', 'example', 'uglify'])
