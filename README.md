file-eval
=========

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/file-eval
[npm-img]:      https://img.shields.io/npm/v/file-eval.svg

[travis]:       https://travis-ci.org/node-eval/file-eval
[test-img]:     https://img.shields.io/travis/node-eval/file-eval/master.svg?label=tests

[coveralls]:    https://coveralls.io/r/node-eval/file-eval
[coverage-img]: https://img.shields.io/coveralls/node-eval/file-eval/master.svg

[david]:        https://david-dm.org/node-eval/file-eval
[david-img]:    http://img.shields.io/david/node-eval/file-eval/master.svg

Read file and eval it. Uses [any-eval](https://github.com/node-eval/any-eval).

Like `require`, but asynchronous and doesn't use the module cache.

**Important:** internally `file-eval` will resolve passed relative paths with `path.resolve()`, not `require.resolve()`.

In addition to `JSON` and `CommonJS` supports [JSON5](http://json5.org) data format.

Install
-------

```
$ npm install --save file-eval
```

Usage
-----

```js
const fileEval = require('file-eval');

fileEval('./path/to/file.js')
    .then(console.log)
    .catch(console.error);
```

API
---

### fileEval(file[, options])

### file

Type: `String`.

The filename or file descriptor.

The `file-eval` determinate format by extension. If filename ends with `.js`, its contents will be evaluating with [vm](https://nodejs.org/dist/latest/docs/api/vm.html).

If filename ends with `.json` extention, its contents will be parsing with `JSON.parse`. If filename ends with `.json5` extention, its contents will be parsing with [json5](https://github.com/json5/json5).

By default expected JS-expression or CommonJS module contents.

#### options

Type: `Object`, `string`.

Options or encoding.

#### options.encoding

Type: `string`.

Default: `utf-8`.

The file encoding.

#### options.flag

Type: `string`.

Default: `r`.

The flag mode.

#### options.context

Type: `Object`.

The object to provide into execute method.

If `context` is specified, then module contents will be evaluating with `vm.runInNewContext`.

If `context` is not specified, then module contents will be evaluating with `vm.runInThisContext`.

With context you can provide some like-a-global variables into `file-eval`.

```js
const fileEval = require('file-eval');
const secretKey = '^___^';

// The file has the contents "module.exports = secretKey;"
fileEval('./path/to/file.js', {
    context: { secretKey }
});

// ➜ '^___^'
```

### fileEval.sync(file[, options])

Synchronous version of [fileEval](#fileevalfile-options).

Method signature is same.

Formats
-------

Supports [CommonJS](#commonjs), [JSON](#json) and [JSON5](#json5) formats.

> See [examples](./examples) with evaluating files with different formats.

### CommonJS

Evaluates `CommonJS` files with `.js` extention.

```js
const fileEval = require('file-eval');

// export data with `module.exports` or `exports`
fileEval('./path/to/file.js');
```

### JSON

Evaluates `JSON` files with `.json` extention.

```js
const fileEval = require('file-eval');

fileEval('./path/to/file.json');
```

### JSON5

Evaluates `JSON5` files with `.json5` extention.

> JSON5 is not an official successor to JSON, and JSON5 content may not work with existing JSON parsers. For this reason, JSON5 files use a new `.json5` extension.

```js
const fileEval = require('file-eval');

fileEval('./path/to/file.json5');
```

Related
-------

* [node-eval](https://github.com/node-eval/node-eval) — eval Node.js contents only (JS-expression, CommonJS modules and JSON).
* [any-eval](https://github.com/node-eval/any-eval) — eval any contents (JS-expression, CommonJS modules and JSON/JSON5).
* [node-file-eval](https://github.com/node-eval/node-file-eval) — read node.js file and eval it with [node-eval](https://github.com/node-eval/node-eval).

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
