'use strict';

var path = require('path');
var fs = require('fs');

var promisify = require('es6-promisify');
var safeEval = require('node-eval');

var readFile = promisify(fs.readFile);

/**
 * Read file and eval it.
 *
 * Like `require`, but asynchronous and doesn't use the module cache.
 *
 * @param {String}        file                     The filename.
 * @param {Object|String} [options]                Options or encoding.
 * @param {String}        [options.encoding=utf-8] The file encoding.
 * @param {String}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {Promise}
 */
module.exports = function(file, options) {
    var filename = path.resolve(file);
    var opts = typeof options === 'string' ? { encoding: options } : options || {};
    var fileOpts = {
        encoding: opts.encoding || 'utf-8',
        flag: opts.flag
    };

    return readFile(filename, fileOpts)
        .then(function(content) {
            return safeEval(content, filename, opts.context);
        });
};
