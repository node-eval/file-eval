'use strict';

const path = require('path');
const fs = require('fs');

const promisify = require('es6-promisify');

const anyEval = require('any-eval');

const readFile = promisify(fs.readFile);

/**
 * Reads file and evals it.
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
module.exports = (file, options) => {
    const filename = path.resolve(file);
    const fileOpts = getFileOpts(options);

    return readFile(filename, fileOpts)
        .then(contents => anyEval(contents, filename, options && options.context));
};

/**
 * Synchronously reads file and evals it.
 *
 * Like `require`, but doesn't use the module cache.
 *
 * @param {String}        file                     The filename.
 * @param {Object|String} [options]                Options or encoding.
 * @param {String}        [options.encoding=utf-8] The file encoding.
 * @param {String}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {*}
 */
module.exports.sync = (file, options) => {
    const filename = path.resolve(file);
    const fileOpts = getFileOpts(options);
    const contents = fs.readFileSync(filename, fileOpts);

    return anyEval(contents, filename, options && options.context);
};

/**
 * Helper to prepare options for fs.readFile
 *
 * @param {Object|String} [options] Options or encoding
 * @param {String}        [options.encoding=utf-8] The file encoding.
 * @param {String}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {Object}
 */
function getFileOpts(options) {
    const opts = typeof options === 'string' ? { encoding: options } : options || {};
    const fileOpts = {
        encoding: opts.encoding || 'utf-8',
        flag: opts.flag
    };
    return fileOpts;
}
