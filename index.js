'use strict';

const fs = require('fs');

const promisify = require('es6-promisify');
const safeEval = require('node-eval');
const isObject = require('isobject');

const readFile = promisify(fs.readFile);

/**
 * Read file and eval it.
 *
 * Like `require`, but asynchronous and doesn't use the module cache.
 *
 * @param {String|Buffer|Integer} file                    The filename or file descriptor.
 * @param {Object|String}         [options]               Options or encoding.
 * @param {String|Null}           [options.encoding=utf-8] The file encoding.
 * @param {String}                [options.flag=r]         The flag mode.
 * @param {Object}                [options.context]        The object to provide into execute method.
 *
 * @returns {Promise}
 */
module.exports = (file, options) => {
    const opts = isObject(options) ? options : {};
    const fileOpts = {
        encoding: opts.encoding || options || 'utf-8',
        flag: opts.flag
    };

    return readFile(file, fileOpts)
        .then(content => safeEval(content, file, opts.context));
};
