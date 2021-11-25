import path from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import json5 from 'json5'

const current = path.dirname(fileURLToPath(import.meta.url))
export const ROOT_PATH = path.resolve(current, '../')
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public')

export function getCssLoader(mode = 'development') {
    if (mode === 'production') {
        return [
            {
                test: /\.css/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    }
    return [
        {
            test: /\.css/i,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
}

export function getAssetsLoader() {
    return [
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.json5$/i,
            type: 'json',
            parser: {
                parse: json5.parse
            }
        }
    ]
}
