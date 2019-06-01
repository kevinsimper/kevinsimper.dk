# How to get the port of Express.js app - DevTip

Express.js is a very popular node.js web framework and yet funny enough there is some things that can be a bit difficult to figure out, one of them is how to get the port of a running express.js app. If you search the docs, there is no mention of getting the port and the documentation is also "old" in the sense that it doesn't document what return types.

So here is how you get the port, here is a small express.js app where we don't specify the port, that will give us a random port. That is something you want if you spin up http servers for testing as they will not collide:

```javascript
const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('Hello blog reader!')
})
app.listen(0, () => {
  console.log('Listening')
})
```

In the documentation it says that `app.listen` returns a node.js `http.server` and in the Node.js documentation you can see [`Class: http.Server`](https://nodejs.org/api/http.html#http_class_http_server) inherits from [`net.Server`](https://nodejs.org/api/net.html#net_class_net_server) and if you look that up you finally see [`server.address()`](https://nodejs.org/api/net.html#net_server_address) will return `{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`

Puuh! That was not beginner friendly, so now our code look like this:

```javascript
const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('Hello blog reader!')
})
let server = app.listen(0, () => {
  console.log('Listening', server.address().port)
})
```

And we have to call the `.address()` inside the listen callback, as the port is first assign whenever it begins listening.

I hope this helped and can also encourage you to look at the Node.js documentation when something requires you going a bit lower :)
