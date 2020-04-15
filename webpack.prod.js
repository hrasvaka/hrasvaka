const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.config')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'laghu.[contentHash].js',
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ],
    },
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: 'laghu.[contentHash].css',
        }),
        new HTMLWebpackPlugin({
            template: './src/frontend/index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                // eslint-disable-next-line prettier/prettier
                quoteCharacter: '\'',
                removeEmptyElements: true,
                removeEmptyAttributes: true,
                sortClassName: true,
            },
        }),
    ],
    modules: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.sass$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
})
