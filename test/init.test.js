var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('init', function() {
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

    it('should read with `utf-8` encoding by default', function() {
        var filename = 'file.js';

        fileEval(filename);

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'utf-8' });
    });

    it('should read with specified encoding', function() {
        var filename = 'file.js';

        fileEval(filename, { encoding: 'ascii' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should support encoding as string argument', function() {
        var filename = 'file.js';

        fileEval(filename, 'ascii');

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should read with specified flag', function() {
        var filename = 'file.js';

        fileEval(filename, { flag: 'r' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { flag: 'r' });
    });
});
