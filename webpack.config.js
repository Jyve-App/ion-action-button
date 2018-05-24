var path = require('path')
var libraryName = 'ion-action-button'
var outputFile = libraryName + '.js'
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          {
            loader: 'string-replace-loader',
            query: {
              search: '\'ngInject\'',
              replace: ''
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env']
              ],
              plugins: [
                ['angularjs-annotate', {
                  explicitOnly: true
                }]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        loaders: [
          {
            loader: 'html-loader',
            options: {
              attrs: false,
              minimize: true,
              removeComments: false,
              collapseWhitespace: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'ion-action-button.css'
    })
  ]
}

module.exports = config
