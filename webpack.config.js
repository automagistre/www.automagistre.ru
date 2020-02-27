"use strict";

const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const PATHS = {
    src: path.resolve(__dirname) + "/assets/",
    dist: path.resolve(__dirname) + "/public/",
    assets: 'assets/'
};

module.exports = {
    mode: NODE_ENV,
    entry: {
        main: ['babel-polyfill', PATHS.src + "/js/main"],
        styles: PATHS.src + "/less/main",
    },
    output: {
        filename: PATHS.assets + "[name].[hash].js",
        path: PATHS.dist,
        library: "[name]",
        publicPath: "/"
    },
    resolve: {
        "extensions": [".js", ".less"]
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
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /(node_modules|bower_components)/
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true, modules: true }
                },{
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        config: { path: 'postcss.config.js'}
                    }
                },
            ]
        },{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },{
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        config: { path: 'postcss.config.js'}
                    }
                },{
                    loader: "less-loader",
                    options: {
                        sourceMap: true,
                    }
                }
            ]
        },{
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                name: "[path][name].[ext]"
            }
        },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            options: {
                name: "[path][name].[ext]"
            }
        }]
    },
    watch: NODE_ENV === "development" ,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === "development" ? "inline-cheap-module-source-map" : false,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: PATHS.assets + "[name].[hash].css"
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/assets/*', '**/img/*', '**/images/*']
        }),
        new CopyWebpackPlugin([
            {from: PATHS.src + 'images', to: PATHS.dist + 'images', ignore:['*/uncompressed/*']},
            {from: PATHS.src + 'img', to: PATHS.dist + 'img', ignore:['*/uncompressed/*']}
        ]),
        new ManifestPlugin()
    ],
};
