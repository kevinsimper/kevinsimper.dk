var webpack = require('webpack')
var fs = require('fs')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

var production = process.env.NODE_ENV === 'production'
var publicPath = (production) ? '/build/' : 'http://localhost:8080/build/'

module.exports = {
  entry: './app/server.js',
  target: 'node',
  output: {
    path: __dirname + '/dist/',
    publicPath: publicPath,
    filename: 'server.js',
    libraryTarget : 'commonjs2'
  },
  externals: nodeModules,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.s?css$/, loaders: ['css-loader/locals?modules&localIdentName=[path][name]---[local]---[hash:base64:5]', 'autoprefixer', 'sass']},
      { test:  /\.json$/, loader: 'json-loader' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.md$/, loader: "html!markdown" }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(woff|eot|woff2|ttf)$/, 'node-noop'),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  devtool: 'sourcemap',
  node: {
    __dirname: true,
    process: true
  }
}
