import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import About from '../components/About'
import Presentations from '../components/Presentations'
import { layout, production, assets } from '../server'
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
        <Presentations />
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
