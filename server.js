'use strict'
let express = require('express')
let app = express()
let webpack = require('webpack')
let reload = require('express-reload')
let production = process.env.NODE_ENV === 'production'

if (!production) {
  let config = require('./webpack.client.config')
  let compiler = webpack(config)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
}

let defaultAssets = {
  main: {
    js: '/build/bundle.js',
    css: '/build/main.css'
  }
}

if (production) {
  global.assets = require(__dirname + '/public/build/webpack.assets.json')
} else {
  global.assets = defaultAssets
}
console.log(JSON.stringify({ production, assets: global.assets }))
app.use(express.static('public', { maxAge: 86400000 }))
app.use('/posts', express.static('app/blog/posts', { maxAge: 86400000 }))

if (!production) {
  var chokidar = require('chokidar')
  var watcher = chokidar.watch('./dist')
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /dist/ module cache from server')
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
}

app.use((req, res, next) =>
  require(__dirname + '/dist/server').app(req, res, next)
)

const { PORT = 9000 } = process.env
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
