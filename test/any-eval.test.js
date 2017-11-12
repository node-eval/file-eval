'use strict';

const path = require('path');

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('any-eval', () => {
    let fileEval, anyEvalStub, readFileStub;

    beforeEach(() => {
        anyEvalStub = sinon.stub().returns({});
        readFileStub = sinon.stub().resolves('{}');

        fileEval = proxyquire('../index.js', {
            'any-eval': anyEvalStub,
            fs: { readFile: readFileStub }
        });
    });

    it('should provide file contents to `any-eval`', () => {
        const filePath = 'file.js';
        const fileContents = '{}';

        return fileEval(filePath)
            .then(() => {
                expect(anyEvalStub).to.be.calledWith(fileContents, sinon.match.string);
            });
    });

    it('should provide absolute filename to `any-eval`', () => {
        const filePath = 'file.js';

        return fileEval(filePath)
            .then(() => {
                const filename = path.resolve(filePath);

                expect(anyEvalStub).to.be.calledWith(sinon.match.string, filename);
            });
    });

    it('should provide context to `any-eval`', () => {
        const filePath = 'file.js';
        const context = {};

        return fileEval(filePath, { context })
            .then(() => {
                expect(anyEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
            });
    });
});
