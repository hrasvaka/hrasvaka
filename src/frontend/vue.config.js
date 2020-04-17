const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    publicPath: '/-/',
    configureWebpack: {
        plugins: [
            new LiveReloadPlugin({
                appendScriptTag: true,
            }),
        ],
    },
}
