var path = require('path');

function parseOperation(url) {
    var extension = path.extname(url);
    var dirname = path.dirname(url);
    var opString = path.basename(url, extension);
    var tokens = opString.split('@');
    return  {
        format: extension.replace('.', ''),
        basename: tokens[0],
        dirname: dirname,
        resize: tokens[1],
        path: path.join(dirname, `${tokens[0]}${extension}`)
    };
}

module.exports = function createResizeOps(ops, image) {
    if (image.url.indexOf('@') !== -1) {
        var op = parseOperation(image.url);
        op.image = image;
        ops.push(op);
    }

    return ops;
};
