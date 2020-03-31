import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import App from '../components/App'
import Contact from '../components/Contact'
import Content from '../components/Content'

let app = express.Router()

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <Contact />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Contact Kevin Simper',
    })
  )
})

export default app
