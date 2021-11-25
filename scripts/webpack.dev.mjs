import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import { DIST_PATH, getAssetsLoader, getCssLoader, PUBLIC_PATH, ROOT_PATH } from './common.mjs'

const MODE = 'development'
process.env.NODE_ENV = MODE

/**
 * @type {import('webpack').Configuration}
 */
const config = merge({
    mode: MODE,
    devtool: 'eval-cheap-module-source-map',
    entry: path.join(ROOT_PATH, 'src', 'main.tsx'),
    target: ['web', 'es2020'],
    stats: 'errors-warnings',
    module: {
        rules: [
            ...getCssLoader(),
            ...getAssetsLoader(),
            {
                test: /\.tsx$/i,
                exclude: /(node_modules|bower_components)/i,
                use: {
                    loader: 'swc-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebpackSwcTemplate',
            template: path.join(PUBLIC_PATH, 'index.html')
        })
    ],
    output: {
        filename: 'webpack/js/[name].bundle.js',
        path: DIST_PATH,
        clean: true,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        static: PUBLIC_PATH,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:8899/web-api-test'
        },
        port: 3000
    }
})

export default config
