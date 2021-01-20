> This repository is now [hosted on Gitlab](https://gitlab.com/romaricpascal/postcss-resize). Please head there if you wish to contribute. Thanks 🙂

# PostCSS Resize [![Build Status][ci-img]][ci]

[PostCSS] plugin for generating resized images from full size assets based on the filenames used as background URLs.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/rhumaric/postcss-resize.svg
[ci]:      https://travis-ci.org/rhumaric/postcss-resize

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-resize') ])
```

See [PostCSS] docs for examples for your environment.
