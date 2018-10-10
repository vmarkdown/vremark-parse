const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'remark-parse2': path.resolve(__dirname, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].common.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        alias: {
        }
    },
    module: {
        rules: [
        ]
    },
    externals: {
    },
    plugins: [
    ]
};

