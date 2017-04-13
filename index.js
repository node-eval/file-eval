'use strict';

var path = require('path');
var fs = require('fs');

var promisify = require('es6-promisify');
var stripBom = require('stripbom');

var contentsEval = require('./lib/file-contents-eval');

var readFile = promisify(fs.readFile);

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
module.exports = function(file, options) {
    var filename = path.resolve(file);
    var fileOpts = prepareOpts(options);

    return readFile(filename, fileOpts)
        .then(function(contents) {
            return contentsEval(stripBom(contents), filename, options && options.context);
        });
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
module.exports.sync = function(file, options) {
    var filename = path.resolve(file);
    var fileOpts = prepareOpts(options);

    var contents = fs.readFileSync(filename, fileOpts);
    return contentsEval(stripBom(contents), filename, options && options.context);
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
function prepareOpts(options) {
    var opts = typeof options === 'string' ? { encoding: options } : options || {};
    var fileOpts = {
        encoding: opts.encoding || 'utf-8',
        flag: opts.flag
    };
    return fileOpts;
}

