'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('read-file', () => {
    let fileEval, readFileStub, anyEvalStub;

    beforeEach(() => {
        readFileStub = sinon.stub().resolves('{}');
        anyEvalStub = sinon.stub().returns({});

        fileEval = proxyquire('../index.js', {
            'any-eval': anyEvalStub,
            fs: { readFile: readFileStub }
        });
    });

    it('should read with `utf-8` encoding by default', () => {
        const filename = 'file.js';

        fileEval(filename);

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'utf-8' });
    });

    it('should read with specified encoding', () => {
        const filename = 'file.js';

        fileEval(filename, { encoding: 'ascii' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should support encoding as string argument', () => {
        const filename = 'file.js';

        fileEval(filename, 'ascii');

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should read with specified flag', () => {
        const filename = 'file.js';

        fileEval(filename, { flag: 'r' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { flag: 'r' });
    });
});
