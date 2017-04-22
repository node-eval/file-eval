var fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', function() {
    it('should strip Bom with .js', function() {
        var fileContents = '\uFEFF"unicorn"';
        var filePath = 'file.js';

        var res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json', function() {
        var fileContents = '\uFEFF"unicorn"';
        var filePath = 'file.json';

        var res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });

    it('should strip Bom with .json5', function() {
        var fileContents = '\uFEFF"unicorn"';
        var filePath = 'file.json5';

        var res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal('unicorn');
    });
});
