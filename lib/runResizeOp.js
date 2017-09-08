var sharp = require('sharp');
var calipers = require('../vendor/calipers');
var path = require('path');
var getModifiedDate = require('./getModifiedDate');

function shouldResize(source, dest) {
    return Promise.all([
        getModifiedDate(source),
        getModifiedDate(dest)
    ]).then(dates => {
        return !dates[1] || dates[1] < dates[0];
    });
}


function readImage(op, opts) {
    var source = path.resolve(opts.imagesSrc, op.path);
    return sharp(source);
}

function resizeImage(s, op) {
    var file = s.options.input.file;
    var ratio = parseFloat(op.resize);
    return calipers.measure(file).then(function (measurement) {
        var size = measurement.pages[0];
        return {
            width: ratio * size.width,
            height: ratio * size.height
        };
    }).then(function (newSize) {
        return s.resize(newSize.width, newSize.height);
    });
}

function writeImage(s, op, opts) {
    var dest = path.join(opts.imagesDest, op.image.url);
    return shouldResize(s.options.input.file, dest).then(should => {
        return new Promise(function (resolve, reject) {
            if (!should) {
                resolve();
                return;
            }
            s.toFile(dest, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    });
}

module.exports = function runResizeOp(op, opts) {
    opts = opts || {};
    var image = readImage(op, opts);
    return resizeImage(image, op, opts).then(function (s) {
        return writeImage(s, op, opts);
    });

};
