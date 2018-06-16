var webpack = require('webpack')
var fs = require('fs')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var colorFunction = require('postcss-color-function')

var nodeModules = {}
fs
  .readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

var production = process.env.NODE_ENV === 'production'
var publicPath = production ? '/build/' : '/build/'

module.exports = {
  entry: './app/server.js',
  target: 'node',
  output: {
    path: __dirname + '/dist/',
    publicPath: publicPath,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.s?css$/,
        use: [
          'css-loader/locals?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'ignore-file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      },
      { test: /\.md$/, use: ['html-loader', 'markdown-loader'] }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /\.(woff|eot|woff2|ttf)$/,
      'node-noop'
    )
    // new webpack.BannerPlugin('require("source-map-support").install();',
    //                          { raw: true, entryOnly: false })
  ],
  devtool: 'eval-cheap-module-source-map',
  node: {
    __dirname: true,
    process: true
  }
}
