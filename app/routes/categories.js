import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import Activities from '../components/Activities/blogs'
import App from '../components/App'
import Content from '../components/Content'
import blogdata from '../blog/posts/_data.json'

let app = express.Router()

app.get('/:category', (req, res, next) => {
  const cat = req.params.category
  const category = blogdata.filter((b) => {
    if (b.hasOwnProperty('tags')) {
      return b.tags.includes(cat)
    } else {
      return false
    }
  })
  if (category.length === 0) {
    return next()
  }

  let content = renderToString(
    <App>
      <Content>
        <h1>Category: {cat}</h1>
        <Activities blogposts={category} />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Category - Kevin Simper',
    })
  )
})
export default app
