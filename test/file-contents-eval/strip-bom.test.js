'use strict';

const fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', () => {
    it('should strip Bom with .js', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.js';

        const res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.json';

        const res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json5', () => {
        const fileContents = '\uFEFF"unicorn"';
        const filePath = 'file.json5';

        const res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });
});
