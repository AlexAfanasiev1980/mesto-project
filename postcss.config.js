// postcss.config.js

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    // подключите autoprefixer
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};