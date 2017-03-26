var fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', function() {
    it('should support JSON', function() {
        var fileContents = '{ "text": "bla" }';
        var filePath = 'file.json';

        var res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal({ text: 'bla' });
    });

    it('should support JSON5', function() {
        var fileContents = "{ text: 'bla' }";
        var filePath = 'file.json5';

        var res = fileContentsEval(fileContents, filePath);

        expect(res).to.be.deep.equal({ text: 'bla' });
    });
});
