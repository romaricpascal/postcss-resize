var postcss = require('postcss');
var getImages = require('./lib/getImage');
var createResizeOps = require('./lib/createResizeOps');
var runResizeOp = require('./lib/runResizeOp');
var defaults = require('lodash.defaults');

module.exports = postcss.plugin('postcss-resize', function (opts) {
  opts = opts || {};
  defaults(opts, {
    imagesSrc: '.',
    imagesDest: '.',
    filter: function () { return true; }
  });
  // Work with options here

  return function (root, result) {
    return Promise.all(getImages(root)
      .filter(opts.filter)
      .reduce(createResizeOps, [])
      .map(function (op) {
        return runResizeOp(op, opts);
      }));
  };
});
