var tmp = require('tmp-promise');
var rimraf = require('rimraf');

module.exports = function (opts, test) {
    return function () {
        return tmp
        .dir(opts)
        .then(function (d) {
            return test(d).then(function () {
                return d;
            });
        })
        .then(function (d) {
            return new Promise(function (resolve, reject) {
                rimraf(d.path, function (err) {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    }
}
