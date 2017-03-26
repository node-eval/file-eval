var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('file-contents-eval', function() {
    var fileContentsEval;
    var nodeEvalStub;

    beforeEach(function() {
        nodeEvalStub = sinon.stub().returns({});

        fileContentsEval = proxyquire('../../lib/file-contents-eval', {
            'node-eval': nodeEvalStub
        });
    });

    it('should run `node-eval` for .js extension', function() {
        var fileContents = '{}';
        var filePath = 'file.js';

        fileContentsEval(fileContents, filePath); // eslint-disable-line no-unused-expressions

        expect(nodeEvalStub).to.be.called; // eslint-disable-line no-unused-expressions
    });

    it('should run `node-eval` for .json extension', function() {
        var fileContents = '{}';
        var filePath = 'file.json';

        fileContentsEval(fileContents, filePath); // eslint-disable-line no-unused-expressions

        expect(nodeEvalStub).to.be.called; // eslint-disable-line no-unused-expressions
    });

    it('should provide file contents to `node-eval`', function() {
        var fileContents = '{}';
        var filePath = 'file.js';

        fileContentsEval(fileContents, filePath);

        expect(nodeEvalStub).to.be.calledWith(fileContents);
    });

    it('should provide filename to `node-eval`', function() {
        var filePath = 'file.js';
        var fileContents = '{}';

        fileContentsEval(fileContents, filePath);

        expect(nodeEvalStub).to.be.calledWith(sinon.match.string, filePath);
    });

    it('should provide context to `node-eval`', function() {
        var filePath = 'file.js';
        var fileContents = '{}';
        var context = {};

        fileContentsEval(fileContents, filePath, context)

        expect(nodeEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
    });
});