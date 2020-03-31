import express from 'express'

import { map, production, assets } from '../consts.js'

let app = express.Router()

app.get('/', (req, res) => {
  res.send(
    map({
      production,
      assets,
    })
  )
})

export default app
