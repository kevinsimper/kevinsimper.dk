var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var plugins = [
  new ExtractTextPlugin("[name].css")
]

if(process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  )
}

module.exports = {
  entry: './app/client.js',
  output: {
    path: __dirname + '/public/build/',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract(
        'style',
        'css?localIdentName=[path][name]---[local]---[hash:base64:5]!autoprefixer!sass'
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
