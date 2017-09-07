var postcss = require('postcss');
var getImages = require('./lib/getImage');
var createResizeOps = require('./lib/createResizeOps');
var runResizeOp = require('./lib/runResizeOp');

module.exports = postcss.plugin('postcss-resize', function (opts) {
  opts = opts || {
    imagesSrc: '.',
    imagesDest: '.'
  };
  // Work with options here

  return function (root, result) {
    getImages(root)
      .reduce(createResizeOps, [])
      .map(function (op) {
        return runResizeOp(op, opts);
      });
  };
});
