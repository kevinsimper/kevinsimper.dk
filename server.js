"use strict"
let production = process.env.NODE_ENV === 'production'

if(production) {
  var opbeat = require('opbeat').start({
    appId: 'c2ed59c7d9',
    organizationId: '414d75509c8b42938651e8660bfce051',
    secretToken: 'cb9d65d129cb5b2325fdbc552f6652e0872ec297'
  })
}

let express = require('express')
let app = express()
let webpack = require('webpack')

if(!production) {
  let config = require('./webpack.client.config')
  let compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }))

  var chokidar = require('chokidar')
  var watcher = chokidar.watch('./dist')
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("Clearing /dist/ module cache from server")
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
}

let defaultAssets = {
  main: {
    js: '/build/bundle.js',
    css: '/build/main.css'
  }
}

if(production) {
  global.assets = require(__dirname + '/public/build/webpack.assets.json')
} else {
  global.assets = defaultAssets
}

app.use(express.static('public', { maxAge: 86400000 }));

app.use(function(req, res, next) {
  require('./dist/server')(req, res, next)
})

const PORT = 9000
app.listen(PORT, () => console.log('Listening on', PORT))
