'use strict';

const path = require('path');

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('node-eval', () => {
    let fileEval;
    let nodeEvalStub;
    let readFileStub;

    beforeEach(() => {
        nodeEvalStub = sinon.stub().returns({});
        readFileStub = sinon.stub().resolves('{}');

        fileEval = proxyquire('../', {
            './lib/file-contents-eval': proxyquire('../lib/file-contents-eval', {
                'node-eval': nodeEvalStub
            }),
            fs: { readFile: readFileStub }
        });
    });

    it('should provide file contents to `node-eval`', () => {
        const filePath = 'file.js';
        const fileContents = '{}';

        return fileEval(filePath)
            .then(() => {
                expect(nodeEvalStub).to.be.calledWith(fileContents, sinon.match.string);
            });
    });

    it('should provide absolute filename to `node-eval`', () => {
        const filePath = 'file.js';

        return fileEval(filePath)
            .then(() => {
                const filename = path.resolve(filePath);

                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, filename);
            });
    });

    it('should provide context to `node-eval`', () => {
        const filePath = 'file.js';
        const context = {};

        return fileEval(filePath, { context })
            .then(() => {
                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
            });
    });
});
