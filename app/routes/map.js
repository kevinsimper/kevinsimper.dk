import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import Recommends from '../components/Recommends'
import { map, production, assets } from '../server'
let app = express.Router()

app.get('/', (req, res) => {
  res.send(
    map({
      production,
      assets
    })
  )
})

export default app
