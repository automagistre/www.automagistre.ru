'use strict';

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PATHS = {
    src: path.resolve(__dirname) + '/assets',
    dist: path.resolve(__dirname) + '/public/assets'
};

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: NODE_ENV,
    entry: {
        main: PATHS.src + '/js/main',
        styles: PATHS.src + 'less/main'
    },
    output: {
        filename: '[name].min.js',
        path: PATHS.dist,
        library: '[name]'
    },
    resolve: {
        "extensions": ['.js', '.less']
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
            use: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        },
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === 'development' ? "inline-cheap-module-source-map" : false,

    plugins: [
        new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            }),
    ],
};