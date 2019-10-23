import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import About from '../components/About'
import App from '../components/App'
import Content from '../components/Content'
import PresentationsPage from '../components/PresentationsPage'

let app = express.Router()

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <About />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'CV and About Kevin Simper'
    })
  )
})

app.get('/presentations', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <PresentationsPage />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Presentations - Kevin Simper'
    })
  )
})

export default app
