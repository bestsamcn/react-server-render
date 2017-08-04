var path = require('path')
var assetsPath = path.join(process.cwd(), 'dist', 'client')
var serverPath = path.join(process.cwd(), 'dist', 'server')
var webpack = require('webpack');
module.exports = [{

    name: 'browser',

    entry: './src/client/main.js',

    output: {
        path: assetsPath,
        filename: '[name].client.js',
        chunkFilename:'[name].chunk.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    ]
}, {
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    name: 'server',
    entry: './src/server/index.js',
    output: {
        path: serverPath,
        filename: 'server.boundle.js',
        library: 'index',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?presets[]=es2015&presets=react'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        })
    ]
}]