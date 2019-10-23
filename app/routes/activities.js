import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import ActivitiesPage from '../components/ActivitiesPage'
import App from '../components/App'
import Content from '../components/Content'
import blogdata from '../blog/posts/_data.json'

let app = express.Router()

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <ActivitiesPage blogdata={blogdata} />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'All activities - Kevin Simper'
    })
  )
})
export default app
