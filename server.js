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

app.use(express.static('public', { maxAge: 86400000 }))

app.use(reload(__dirname + '/dist/server'))

const { PORT = 9000 } = process.env
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
