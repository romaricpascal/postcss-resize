var tmp = require('tmp-promise');

module.exports = function (opts, test) {
  return function () {
    var dir;
    return tmp
      .dir(opts)
      .then(function (d) {
        dir = d;
        return d;
      })
      .then(test)
      .then(function () {
        dir.cleanup();
      })
      .catch(function (e) {
        console.log('Working dir for failed test',dir.path);
        throw e;
      });
  }
}
