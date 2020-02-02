"use strict";

const webpack = require("webpack");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";
const PATHS = {
    src: path.resolve(__dirname) + "/assets/",
    dist: path.resolve(__dirname) + "/public/",
    assets: 'assets/'
};

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: NODE_ENV,
    entry: {
        main: PATHS.src + "/js/main",
        styles: PATHS.src + "/less/main",
    },
    output: {
        filename: PATHS.assets + "[name].min.js",
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
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /(node_modules|bower_components)/
        },{
            test: /\.css$/,
            use: [
                "style-loader",
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
                },
            ]
        },{
            test: /\.less$/,
            use: [
                "style-loader",
                {
                    loader: MiniCssExtractPlugin.loader,

                },
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
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV === "development" ? "inline-cheap-module-source-map" : false,

    plugins: [
        new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            }),
        new MiniCssExtractPlugin({
            filename: PATHS.assets + "[name].min.css"
        })
    ],
};