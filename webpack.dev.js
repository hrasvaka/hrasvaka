const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const common = require('./webpack.config')

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!*.html'],
        }),
        new HTMLWebpackPlugin({
            template: './src/frontend/index.html',
        }),
        new LiveReloadPlugin({ appendScriptTag: true }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
})
