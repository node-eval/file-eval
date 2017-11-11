'use strict';

const fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', () => {
    it('should throw if extension is not supported', () => {
        const fileContents = 'bla bla';
        const filePath = 'file.txt';

        expect(() => {
            fileContentsEval(fileContents, filePath);
        }).to.throw('Not support extension ".txt" to eval');
    });

    it('should throw if syntax error in JSON', () => {
        const fileContents = '{ "text": "bla }';
        const filePath = 'file.json';

        expect(() => {
            fileContentsEval(fileContents, filePath);
        }).to.throw(/file.json: Unexpected/);
    });

    it('should throw if syntax error in JSON5', () => {
        const fileContents = "{ text: 'bla }";
        const filePath = 'file.json5';

        expect(() => {
            fileContentsEval(fileContents, filePath);
        }).to.throw('file.json5: Bad string at line 1 column 16 of the JSON5 data. Still to read');
    });
});
