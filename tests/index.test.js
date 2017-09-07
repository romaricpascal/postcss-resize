var postcss = require('postcss');
var plugin = require('../index.js');
var rimraf = require('rimraf');
var calipers = require('../vendor/calipers');
var SRC_DIR = __dirname + '/fixtures';
var DEST_DIR = __dirname + '/dest';

var fs = require('fs');
var path = require('path');
var css = fs.readFileSync(`${__dirname}/fixtures/style.css`, {encoding: 'utf8'});

describe('postcss-resize', function () {

  beforeAll(function () {
    return new Promise(function (resolve, reject) {
      rimraf(DEST_DIR + '/*.png', function (err) {
        if (err) reject(err);
        resolve();
      });
    });
  });

  it('Resizes images provided by URLs', function () {

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

    return postcss([plugin({
      imagesSrc: SRC_DIR,
      imagesDest: DEST_DIR
    })]).process(css)
      .then(result => {
        return Object.keys(expecations).map(function (file) {
          return calipers.measure(path.join(DEST_DIR, file))
            .then(function (measurement) {
              expect(measurement.pages[0]).toEqual(expecations[file]);
            });
        });
      });
  });
});
