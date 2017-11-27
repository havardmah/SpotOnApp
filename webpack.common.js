const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src/index.js'),
        path.join(__dirname, 'src/style/style.scss')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/build.[hash].js',
        chunkFilename: 'js/chunks/[id].[chunkhash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2'],
                        plugins: ['external-helpers', 'transform-runtime'],
                        cacheDirectory: true
                    }
                }
            },{
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/fonts/'
                    }
                }]
            },{
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/images/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "style/style.[hash].css",
            allChunks: true
        }),

        new HtmlWebpackPlugin({
            title: 'Spot On',
            template: 'base.html',
            favicon: 'src/img/favicon.png',
            icon: 'src/img/icon.jpg',
            startupImage: 'src/img/load_image.jpg'
        }),

        new webpack.HotModuleReplacementPlugin()
    ]

};