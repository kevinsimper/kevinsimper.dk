"use strict"
let express = require('express')
let app = express()

let production = process.env.NODE_ENV === 'production'
if(!production) {
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

app.use(express.static('/public', { maxAge: 86400000 }));

app.use(function(req, res, next) {
  require('./dist/server')(req, res, next)
})

const PORT = 9000
app.listen(PORT, () => console.log('Listening on', PORT))
