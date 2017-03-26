var fileContentsEval = require('../../lib/file-contents-eval');

describe('file-contents-eval', function() {
    it('should throw if extension is not supported', function() {
        var fileContents = 'bla bla';
        var filePath = 'file.txt';

        expect(function () {
            fileContentsEval(fileContents, filePath);
        }).to.throw('Not support extension ".txt" to eval');
    });

    it('should throw if syntax error in JSON', function() {
        var fileContents = '{ "text": "bla }';
        var filePath = 'file.json';

        expect(function () {
            fileContentsEval(fileContents, filePath);
        }).to.throw(/file.json: Unexpected/);
    });

    it('should throw if syntax error in JSON5', function() {
        var fileContents = "{ text: 'bla }";
        var filePath = 'file.json5';

        expect(function () {
            fileContentsEval(fileContents, filePath);
        }).to.throw('file.json5: Bad string at line 1 column 16 of the JSON5 data. Still to read');
    });
});
