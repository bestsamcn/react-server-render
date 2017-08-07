var path = require('path')
var assetsPath = path.join(process.cwd(), 'dist', 'client')
var serverPath = path.join(process.cwd(), 'dist', 'server')
var webpack = require('webpack');
var rm = require('rimraf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
rm(process.cwd() + '/dist', err => console.log(err));

module.exports = [{
    name: 'browser',
    devtool: 'cheap-module-source-map',
    entry: {
        //[app]为输出的文件名，output下的filename
        main:'./src/client/main.js',
        //公共文件分离
        vendor:['react','redux', 'react-redux', 'react-router']
    },

    output: {
        path: assetsPath,
        filename: 'js/[name].client.js',
        publicPath:'/',
        //打包require.ensure
        chunkFilename:'js/[name].chunk.js'
    },
    
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query:{
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader',
            query: {
                limit: 1000000,
                name: 'fonts/[name].[ext]',
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            query: {
                name: 'fonts/[name].[ext]',
            }

        }]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('css/[name].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"development"'},
            '__isServer__': false,
            '__isClient__': true
        }),
        //分离manifest
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor', 'manifest'],
            filename:'js/[name].chunk.js'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: false
        // })

    ]
}, {
    name: 'server',
    devtool: 'cheap-module-source-map',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    entry: './src/server/index.js',
    output: {
        path: serverPath,
        filename: 'main.server.js',
        library: 'index',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets=react'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'assets/img/[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'assets/img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader',
            query: {
                limit: 1000000,
                name: 'assets/fonts/[name].[ext]',
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            query: {
                name: 'assets/fonts/[name].[ext]',
            }

        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"development"'},
            '__isServer__': true,
            '__isClient__': false
        }),
        new ExtractTextPlugin('assets/css/[name].css', {allChunks: true}),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: false
        // })
    ]
}]