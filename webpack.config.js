"use strict";

const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || "development";
const PATHS = {
    src: path.resolve(__dirname) + "/assets/",
    dist: path.resolve(__dirname) + "/public/",
    assets: 'assets/'
};

const isDev = NODE_ENV === "development";

const resolveAssetsPath = (resourcePath) => {
    const pathSplit = resourcePath.split('/').reverse()
    const assetIndex = pathSplit.findIndex((element) => element=== 'assets')
    const path = pathSplit.slice(0, assetIndex)
    return `/${path.reverse().join('/')}`
}

const progressHandler = (percentage, message, ...args) => {
    console.info(`${Math.round(percentage * 100)}%`, message, ...args);
}

module.exports = {
    mode: NODE_ENV,
    entry: {
        main: ['babel-polyfill', PATHS.src + "/js/main"],
        styles: PATHS.src + "/less/main",
    },
    output: {
        filename: PATHS.assets + "[name].[hash].js",
        chunkFilename: PATHS.assets + "[id].[chunkhash].js",
        path: PATHS.dist,
        library: "[name]",
        publicPath: "/"
    },
    resolve: {
        "extensions": [".js", ".less", ".css"]
    },
    optimization: {
        minimize: !isDev,
        minimizer:[
            new TerserPlugin({
                extractComments: false,
                sourceMap: isDev,
                parallel: true,
                terserOptions: {
                    extractComments: 'all',
                    compress: {
                        drop_console: !isDev,
                    },
                },
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true,
                },
            }
        }
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader",
            }
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                },
                {
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
            test: /\.(png|jpe?g|gif)\.?(webp|avif)?$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath(url, resourcePath){
                    return resolveAssetsPath(resourcePath)
                },
                publicPath(url, resourcePath) {
                    return resolveAssetsPath(resourcePath)
                }
            }
        },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath(url, resourcePath){
                    return resolveAssetsPath(resourcePath)
                },
                publicPath(url, resourcePath) {
                    return resolveAssetsPath(resourcePath)
                }
            }
        },{
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        }
        ]
    },
    watch: NODE_ENV === "development" ,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: false,
    stats: {
        entrypoints: false,
        children: false
    },
    plugins: [
        new webpack.ProgressPlugin(progressHandler),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: PATHS.assets + '[name].[hash].css',
            chunkFilename: PATHS.assets + '[id].[hash].css',
            esModule: true,
            modules: {
                namedExport: true,
            },
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
            cleanStaleWebpackAssets: false,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/assets/*', '**/img/*', '**/images/*']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: PATHS.src + 'images',
                    to: PATHS.dist + 'images',
                    globOptions: {
                        ignore: ['*/uncompressed/*']
                    }
                },
                {
                    from: PATHS.src + 'img',
                    to: PATHS.dist + 'img',
                    globOptions: {
                        ignore: ['*/uncompressed/*']
                    }
                },
                {
                    from: PATHS.src + 'fonts',
                    to: PATHS.dist + 'fonts',
                },
            ],
        }),
        new ManifestPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: PATHS.assets + '[name].[hash].js.map',
            exclude: ['vendors.js'],
            fileContext: 'public',
        }),
        new ESLintPlugin({
            fix: isDev,
            exclude: 'node_modules'
        })
    ],
};
