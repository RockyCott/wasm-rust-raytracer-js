const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './lib/main.js',
    output: {
        path: path.resolve(__dirname, '../docs'),
        filename: 'bundle.js',
    },
    mode: 'production',
    plugins: [
        new CopyPlugin([path.resolve(__dirname, "public")]),
      ],
};