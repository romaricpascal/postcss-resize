var BACKGROUND_PROPS = /^background(-image)?/;

module.exports = function getImage(root) {
    var images = [];
    root.walkDecls(BACKGROUND_PROPS, function (decl) {
        var matches = /url\(\s*['"]?([^"')]+)["']?\s*\)/.exec(decl.value);
        if (matches) {
            images.push({
                url: matches[1],
                decl: decl
            });
        }
    });
    return images;
};
