var webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var AssetsPlugin = require('assets-webpack-plugin')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var colorFunction = require('postcss-color-function')

var production = process.env.NODE_ENV === 'production'
var publicPath = production ? '/build/' : '/build/'
var path = __dirname + '/public/build/'
var jsName = production ? '[name]-bundle-[hash].js' : '[name].bundle.js'
var cssName = production ? '[name]-bundle-[hash].css' : '[name].css'

var plugins = [
  new MiniCssExtractPlugin({
      filename: cssName,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
var entry = []
if (production) {
  plugins.push(
    new AssetsPlugin({
      filename: 'webpack.assets.json',
      prettyPrint: true,
      path: path
    })
  )
}
entry.push('./app/client.js')
if (!production) {
  entry.push('webpack-hot-middleware/client')
}

module.exports = {
  mode: 'development',
  entry: {
    main: entry,
    map: './app/map/map.js'
  },
  output: {
    path: path,
    publicPath: publicPath,
    filename: jsName
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]', 'postcss-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(woff|eot|woff2|ttf)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: plugins,
  devtool: 'source-map'
}
