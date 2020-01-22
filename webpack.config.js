'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './assets/js/main.js',
    mode: NODE_ENV,
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, './public/assets')
    },
    optimization: {
        minimizer:[
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true
                    },
                },
                parallel: true,
            })
        ],
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        }]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === 'development' ? "inline-cheap-module-source-map" : false,

    plugins: [
        new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            })
    ],
};