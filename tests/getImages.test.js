var getImages = require('../lib/getImage');

describe('getImages', function () {
  var fs = require('fs');
  var css = fs.readFileSync(`${__dirname}/fixtures/style.css`, {encoding: 'utf8'});
  var root = require('postcss').parse(css);
  var images = getImages(root);

  it('Extracts image URLs from background-image properties', function () {
    expect(images.some(function (image) {
      return image.url === 'asset.200x150.png';
    })).toBe(true);
  });

  it('Extracts image URLs from background properties', function () {
    expect(images.some(function (image) {
      return image.url === 'asset.400x300.png';
    })).toBe(true);
  });
});
