file-eval
=========

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/file-eval
[npm-img]:      https://img.shields.io/npm/v/file-eval.svg

[travis]:       https://travis-ci.org/nodules/file-eval
[test-img]:     https://img.shields.io/travis/nodules/file-eval.svg?label=tests

[david]:        https://david-dm.org/nodules/file-eval
[david-img]:    http://img.shields.io/david/nodules/file-eval.svg?style=flat

Read file and eval it. Uses [node-eval](https://github.com/nodules/node-eval).

Like `require`, but asynchronous and doesn't use the module cache.

**NB** Internally `file-eval` will resolve passed relative paths with `path.resolve()`, not `require.resolve()`.

Install
-------

```
$ npm install --save file-eval
```

Usage
-----

```js
const fileEval = require('file-eval');

fileEval('path/to/file.js')
    .then((data) => console.log(data))
    .catch(err => console.log(err));
```

API
---

### fileEval(file[, options])

### file

Type: `String`.

The filename or file descriptor

#### options

Type: `Object`, `String`.

Options or encoding.

#### options.encoding

Type: `String`.

Default: `utf-8`.

The file encoding.

#### options.flag

Type: `String`.

Default: `r`.

The flag mode.

#### options.context

Type: `Object`.

The object to provide into execute method.

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
