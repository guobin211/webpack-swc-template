import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';
import { DIST_PATH } from './config.mjs';
import { getAssetsLoader, getCssLoader, getTsxLoader } from './webpack.common.mjs';
import devConfig from './webpack.dev.mjs';

const MODE = 'production';
process.env.NODE_ENV = MODE;

const testConfig = merge(devConfig, {
  mode: MODE,
  target: ['web', 'es5'],
  stats: 'errors-warnings',
  devtool: false,
  output: {
    filename: 'webpack/js/[name].[contenthash].js',
    sourceMapFilename: 'webpack/js/[name].map',
    path: DIST_PATH,
    clean: true,
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      ...getCssLoader(MODE),
      ...getAssetsLoader(MODE),
      getTsxLoader()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'webpack/css/[name].[contenthash].css',
      chunkFilename: 'webpack/css/[id].[contenthash].css'
    })
  ],
  devServer: {}
});

export default testConfig;
