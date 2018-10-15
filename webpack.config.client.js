const path = require('path');
const {ReactLoadablePlugin} = require('react-loadable/webpack');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let browserConfig = {
  entry: {
    main: './src/client/index',
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      services: `${__dirname}/src/services`,
    }
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        exclude: [/node_modules/, /src\/server/],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', {modules: false}],
              'react',
            ],
            plugins: [
              'transform-object-rest-spread',
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-assign',
              'react-loadable/babel',
              ["transform-runtime", {
                "polyfill": false,
                "regenerator": true
              }]
            ],
          }
        },
      },
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
            {loader: 'less-loader'}
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'dist', 'react-loadable.json'),
    }),
  ]
};

module.exports = browserConfig;
