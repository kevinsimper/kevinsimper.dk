import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import Recommends from '../components/Recommends'
import { layout, production, assets } from '../server'
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
