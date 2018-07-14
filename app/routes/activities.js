import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import ActivitiesPage from '../components/ActivitiesPage'
import activities from '../components/activities'
import blogdata from '../blog/posts/_data.json'
import { layout, production, assets } from '../server'
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
