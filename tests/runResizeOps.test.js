var runResizeOp = require('../lib/runResizeOp');
var rimraf = require('rimraf');
var calipers = require('calipers')('png','jpeg','gif');

var SRC_DIR = __dirname + '/fixtures';
var DEST_DIR = __dirname + '/dest';
describe('runResizeOp', function () {

  beforeAll(function () {
  })

  it('Resizes the image', function () {
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
      imagesDest: DEST_DIR
    }).then(function () {
      return calipers.measure(DEST_DIR + '/asset@0.5x.png')
        .then(function (measurement) {
          var size = measurement.pages[0];
          expect(size.width).toEqual(400);
          expect(size.height).toEqual(300);
        });
    });

  });
});
