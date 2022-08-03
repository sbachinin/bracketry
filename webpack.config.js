const path = require('path');

module.exports = {
  entry: './lib/lib.mjs',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: {
        name: 'easyPlayoffs',
        type: 'commonjs',
    },
  },
  mode: 'production',
  devtool: 'source-map',
};