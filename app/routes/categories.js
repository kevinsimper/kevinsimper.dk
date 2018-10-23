import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import Activities from '../components/activities/blogs'
import blogdata from '../blog/posts/_data.json'
import { layout, production, assets } from '../server'
let app = express.Router()

app.get('/:category', (req, res, next) => {
  const cat = req.params.category
  const category = blogdata.filter(b => {
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
      title: 'Category - Kevin Simper'
    })
  )
})
export default app
