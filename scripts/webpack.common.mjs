import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import json5 from 'json5'

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

export function getTsxLoader() {
    return {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/i,
        use: {
            loader: 'swc-loader',
        }
    }
}
