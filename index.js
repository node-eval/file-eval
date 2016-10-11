'use strict';

const fs = require('fs');

const promisify = require('es6-promisify');
const safeEval = require('node-eval');

const readFile = promisify(fs.readFile);

/**
 * Read file and eval it.
 *
 * Like `require`, but asynchronous and doesn't use the module cache.
 *
 * @param {String|Buffer|Integer} file                   The filename or file descriptor.
 * @param {Object|String}         [options]              Options or encoding.
 * @param {String|Null}           [option.encoding=null] The file encoding.
 * @param {String}                [option.flag=r]        The flag mode.
 *
 * @returns {Promise}
 */
module.exports = (file, options) => {
    return readFile(file, options || 'utf-8')
        .then((content) => safeEval(content, file));
};
