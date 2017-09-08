var fs = require('fs');

module.exports = function getFileMTime(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(path, function (err, stats) {
            if (err && err.code !== 'ENOENT') reject(err);
            resolve(stats && stats.mtime);
        });
    });
};
