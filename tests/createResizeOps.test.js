var createResizeOps = require('../lib/createResizeOps');

describe('createResizeOps', function () {
    it('Extracts resize factor from file name', function () {
        var images = [{
            url: 'asset@0.5x.png'
        }];

        var ops = images.reduce(createResizeOps, []);
        expect(ops[0].basename).toEqual('asset');
        expect(ops[0].format).toEqual('png');
        expect(ops[0].resize).toEqual('0.5x');
        expect(ops[0].path).toEqual('asset.png');
    });
});
