var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('read-file-sync', function() {
    var fileEval;
    var readFileStub;
    var evalStub;

    beforeEach(function() {
        readFileStub = sinon.stub().returns('{}');
        evalStub = sinon.stub().returns({});

        fileEval = proxyquire('../', {
            './lib/file-contents-eval': evalStub,
            fs: { readFileSync: readFileStub }
        });
    });

    it('should read with `utf-8` encoding by default', function() {
        var filename = 'file.js';

        fileEval.sync(filename);

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'utf-8' });
    });

    it('should read with specified encoding', function() {
        var filename = 'file.js';

        fileEval.sync(filename, { encoding: 'ascii' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should support encoding as string argument', function() {
        var filename = 'file.js';

        fileEval.sync(filename, 'ascii');

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should read with specified flag', function() {
        var filename = 'file.js';

        fileEval.sync(filename, { flag: 'r' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { flag: 'r' });
    });
});
