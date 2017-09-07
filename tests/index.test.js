var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var rimraf = require('rimraf');
var withTmpDir = require('./withTmpDir');
var plugin = require('../index.js');
var calipers = require('../vendor/calipers');
var SRC_DIR = __dirname + '/fixtures';
var DEST_DIR = __dirname + '/dest';
var DIR_TEMPLATE = path.join(DEST_DIR, 'tmp-XXXXXX');


var css = fs.readFileSync(`${__dirname}/fixtures/style.css`, {encoding: 'utf8'});

function run(opts) {
  return postcss([plugin(opts)]).process(css);
}

describe('postcss-resize', function () {

  it.only('Resizes images provided by URLs',
    withTmpDir({template: DIR_TEMPLATE}, function (dir) {

      var expecations = {
        'asset@0.25x.png': {
          width: 200,
          height: 150
        },
        'asset@0.125x.png': {
          width: 100,
          height: 75
        }
      };

      var opts = {
        imagesSrc: SRC_DIR,
        imagesDest: dir.path
      };

    return run(opts)
      .then(result => {
        return Promise.all(Object.keys(expecations).map(function (file) {
          var fullPath = path.join(dir.path, file);
          console.log(fullPath);
          return calipers.measure(fullPath)
            .then(function (measurement) {
              expect(measurement.pages[0]).toEqual(expecations[file]);
            });
        }));
      });
    })
  );

  describe('opts.filter', function () {

    it('Prevents processing of filtered out images',
      withTmpDir({template: DIR_TEMPLATE}, function (dir) {

        var opts = {
          imagesSrc: SRC_DIR,
          imagesDest: dir.path,
          filter: function (image) {
            return image.url.indexOf('125') !== -1;
          }
        };

        return run(opts).then(result => {
          expect(fs.existsSync(path.join(dir.path, 'asset@0.25x.png'))).toBe(false);
        });
      })
    );
  });
});
