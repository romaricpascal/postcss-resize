var sharp = require('sharp');
var calipers = require('../vendor/calipers');
var path = require('path');

function readImage(op, opts) {
  var source = path.resolve(opts.imagesSrc, op.path);
  return sharp(source);
}

function resizeImage(s, op, opts) {
  var file = s.options.input.file;
  var ratio = parseFloat(op.resize);
  return calipers.measure(file).then(function (measurement) {
    var size = measurement.pages[0];
    return {
      width: ratio * size.width,
      height: ratio * size.height
    };
  }).then(function(newSize) {
    return s.resize(newSize.width, newSize.height);
  });
}

function writeImage(s, op, opts) {
  console.log(op);
  var dest = path.join(opts.imagesDest, op.image.url);
  return new Promise(function (resolve, reject) {
      s.toFile(dest, function (err) {
        if (err) reject(err);
        resolve()
      });
  });
}

module.exports = function runResizeOp(op, opts) {
  opts = opts || {};
  var s = readImage(op, opts);
  return resizeImage(s, op, opts).then(function (s) {
    return writeImage(s, op, opts);
  }).catch();

}
