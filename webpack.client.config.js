var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
  new ExtractTextPlugin(cssName),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin()
]
var entry = []
if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
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
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
            'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&interlaced=false'
        ]
      },
      {
        test: /\.(woff|eot|woff2|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
}
