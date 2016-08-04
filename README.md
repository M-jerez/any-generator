# &laquo; Any-Gen &raquo;
[![Travis](https://img.shields.io/travis/M-jerez/any-generator.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000?style=flat-square)]()
[![David](https://img.shields.io/david/M-jerez/any-generator.svg?maxAge=2592000?style=flat-square)]()
[![Github All Releases](https://img.shields.io/github/downloads/M-jerez/any-generator/total.svg?maxAge=2592000?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000?style=flat-square)]()

> Automatic scaffold generator for any project.

## Install

Install with [npm](https://npmjs.org/package/gulp-concat-css).

```
npm install --save-dev  anygen
```

## Examples

[![Gulp](https://img.shields.io/badge/use--via-Gulp-orange.svg)]() Using with gulp:
```js
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('default', function () {
  return gulp.src('assets/**/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('out/'));
});
```

[![Grunt](https://img.shields.io/badge/use--via-Grunt-yellow.svg)]() Using with Grunt:  
```js
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

gulp.task('default', function () {
  return gulp.src('assets/**/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('out/'));
});
```


[![Grunt](https://img.shields.io/badge/use--via-npm-red.svg)]() Using with npm script: 
Add the next line to the script section in the package.json file.
```js
//file package.json
{
	scripts:{
		"anygen": "node node_modules/anygen/dist/index.js your/path/to/generators your/dest/path"
	}
}
```

**TIP: for a proper import inlining and url rebase, make sure you set the proper `base` for the input files.**

## API

`concatCss(targetFile, options)`
* `targetFile`: The relative path of the generated file containing the concatenated css
* `options`: (since 2.1.0)
    * `inlineImports`: (default `true`) Inline any local import statement found
    * `rebaseUrls`: (default `true`) Adjust any relative URL to the location of the target file.
    * `includePaths`: (default `[]`) Include additional paths when inlining imports

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro