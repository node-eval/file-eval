'use strict';

const fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', () => {
    it('should support JSON', () => {
        const fileContents = '{ "text": "bla" }';
        const filePath = 'file.json';

        const res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal({ text: 'bla' });
    });

    it('should support JSON5', () => {
        const fileContents = "{ text: 'bla' }";
        const filePath = 'file.json5';

        const res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal({ text: 'bla' });
    });
});
