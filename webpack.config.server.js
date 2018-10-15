const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      services: `${__dirname}/src/services`,
    }
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'},
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "false",
      __PROJECT_DIR__: JSON.stringify(__dirname),
      __ASSETS_DIR__: JSON.stringify(path.join(__dirname, 'dist'))
    }),
  ]
};

module.exports = serverConfig;
