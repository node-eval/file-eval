'use strict';

const path = require('path');

const nodeEval = require('node-eval');
const JSON5 = require('json5');

/**
 * Evals file contents as expressions, JSON or commonJS module.
 *
 * @param {String} contents contents to eval
 * @param {String} [filename] path to file with contents
 * @param {Object} [context] objects to provide into execute method
 * @returns {*}
 */
module.exports = (contents, filename, context) => {
    const ext = path.extname(filename);

    if (ext === '.json' || ext === '.js') {
        return nodeEval(contents, filename, context);
    }

    if (ext === '.json5') {
        return tryCatch(() => JSON5.parse(contents), err => {
            err.message = `${filename}: ${err.message}`;
            throw err;
        });
    }

    throw new Error(`Not support extension "${ext}" to eval`);
};

/**
 * Execute function inside try-catch function with try-catch is not optimized so we made this helper.
 *
 * @param {Function} tryFn function to try
 * @param {Function} catchFn function to catch
 * @returns {*}
 */
function tryCatch(tryFn, catchFn) {
    try {
        return tryFn();
    } catch(e) {
        catchFn(e);
    }
}
