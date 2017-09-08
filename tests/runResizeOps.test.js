var runResizeOp = require('../lib/runResizeOp');
var calipers = require('../vendor/calipers');
var path = require('path');
var withTmpDir = require('./withTmpDir');

var SRC_DIR = path.join(__dirname, 'fixtures');
var DEST_DIR = path.join(__dirname, 'dest');
var DIR_TEMPLATE = path.join(DEST_DIR, 'tmp-XXXXXX');
describe('runResizeOp', function () {

    it('Resizes the image',
        withTmpDir({ template: DIR_TEMPLATE }, function (dir) {
            var op = {
                format: 'png',
                basename: 'asset',
                dirname: '.',
                resize: '0.5x',
                path: 'asset.png',
                image: { url: 'asset@0.5x.png' }
            };

            return runResizeOp(op, {
                imagesSrc: SRC_DIR,
                imagesDest: dir.path
            }).then(function () {
                return calipers.measure(path.join(dir.path, 'asset@0.5x.png'))
                .then(function (measurement) {
                    var size = measurement.pages[0];
                    expect(size.width).toEqual(400);
                    expect(size.height).toEqual(300);
                });
            });
        })
    );
});
