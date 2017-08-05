var path = require('path')
var assetsPath = path.join(process.cwd(), 'dist', 'client')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    name: 'browser',
    devtool: 'cheap-module-source-map',
    entry: {
        //[app]为输出的文件名，output下的filename
        main:'./src/client/main.js'
        //公共文件分离
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
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"development"'},
            '__isServer__': false,
            '__isClient__': true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })

    ]
}