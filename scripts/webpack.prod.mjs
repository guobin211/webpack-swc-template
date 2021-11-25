import devConfig from './webpack.dev.mjs'
import { merge } from 'webpack-merge'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { getAssetsLoader, getCssLoader } from './common.mjs'

const MODE = 'production'
process.env.NODE_ENV = MODE

const prodConfig = merge(devConfig, {
    devtool: false,
    mode: MODE,
    target: ['web', 'es5'],
    stats: 'errors-warnings',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: [
            ...getCssLoader(MODE),
            ...getAssetsLoader(MODE),
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
        new MiniCssExtractPlugin({
            filename: 'webpack/css/[name].[contenthash].css',
            chunkFilename: 'webpack/css/[id].[contenthash].css'
        })
    ],
    devServer: {}
})

export default prodConfig
