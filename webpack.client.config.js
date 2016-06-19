var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var AssetsPlugin = require('assets-webpack-plugin');

var production = process.env.NODE_ENV === 'production'
var publicPath = (production) ? '/build/' : 'http://localhost:8080/build/'
var path = __dirname + '/public/build/'
var jsName = (production) ? '[name]-bundle-[hash].js' : '[name].bundle.js'
var cssName = (production) ? '[name]-bundle-[hash].css' : '[name].css'

var plugins = [
  new ExtractTextPlugin(cssName),
]

if(production) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
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

module.exports = {
  entry: {
    main: './app/client.js',
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
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test:  /\.json$/, loader: 'json-loader' },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!autoprefixer!sass'
      )},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(woff|eot|woff2|ttf)$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map'
}
