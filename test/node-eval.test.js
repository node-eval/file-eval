var path = require('path');

var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('node-eval', function() {
    var fileEval;
    var evalStub;
    var readFileStub;

    beforeEach(function() {
        evalStub = sinon.stub().returns({});
        readFileStub = sinon.stub().resolves('{}');

        fileEval = proxyquire('../', {
            'node-eval': evalStub,
            fs: {
                readFile: readFileStub
            }
        });
    });

    it('should provide file contents to `node-eval`', function() {
        var filePath = 'file.js';
        var fileContents = '{}';

        return fileEval(filePath)
            .then(function () {
                expect(evalStub).to.be.calledWith(fileContents, sinon.match.string);
            });
    });

    it('should provide absolute filename to `node-eval`', function() {
        var filePath = 'file.js';

        return fileEval(filePath)
            .then(function () {
                var filename = path.resolve(filePath);

                expect(evalStub).to.be.calledWith(sinon.match.string, filename);
            });
    });

    it('should provide context to `node-eval`', function() {
        var filePath = 'file.js';
        var context = {};

        return fileEval(filePath, { context: context })
            .then(function () {
                expect(evalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
            });
    });
});
