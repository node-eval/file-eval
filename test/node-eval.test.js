var path = require('path');

var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('node-eval', function() {
    var fileEval;
    var nodeEvalStub;
    var readFileStub;

    beforeEach(function() {
        nodeEvalStub = sinon.stub().returns({});
        readFileStub = sinon.stub().resolves('{}');

        fileEval = proxyquire('../', {
            './lib/file-contents-eval': proxyquire('../lib/file-contents-eval', {
                'node-eval': nodeEvalStub
            }),
            fs: { readFile: readFileStub }
        });
    });

    it('should provide file contents to `node-eval`', function() {
        var filePath = 'file.js';
        var fileContents = '{}';

        return fileEval(filePath)
            .then(function () {
                expect(nodeEvalStub).to.be.calledWith(fileContents, sinon.match.string);
            });
    });

    it('should provide absolute filename to `node-eval`', function() {
        var filePath = 'file.js';

        return fileEval(filePath)
            .then(function () {
                var filename = path.resolve(filePath);

                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, filename);
            });
    });

    it('should provide context to `node-eval`', function() {
        var filePath = 'file.js';
        var context = {};

        return fileEval(filePath, { context: context })
            .then(function () {
                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
            });
    });
});
