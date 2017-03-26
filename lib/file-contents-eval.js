'use strict';

var path = require('path');

var nodeEval = require('node-eval');

/**
 * Evals file contents as expressions, JSON or commonJS module.
 *
 * @param {String} contents contents to eval
 * @param {String} [filename] path to file with contents
 * @param {Object} [context] objects to provide into execute method
 * @returns {*}
 */
module.exports = function(contents, filename, context) {
    var ext = path.extname(filename);

    if (ext === '.json' || ext === '.js') {
        return nodeEval(contents, filename, context);
    }

    throw new Error('Not support extension "' + ext + '" to eval');
};
