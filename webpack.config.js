const path = require('path')

module.exports = {
    entry: './src/frontend/app.ts',
    output: {
        path: path.join(process.cwd(), 'dist', 'frontend'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true,
                        preprocess: require('svelte-preprocess')(),
                    },
                },
            },
        ],
    },
}
