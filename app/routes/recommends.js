import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import App from '../components/App'
import Recommends from '../components/Recommends'

let app = express.Router()

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Recommends
        lasagne={parseInt(req.query.lasagne) || 4}
        pizza={parseInt(req.query.pizza) || 2}
      />
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Recommends - Kevin Simper'
    })
  )
})

export default app
