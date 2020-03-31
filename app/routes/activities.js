import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'
import { layout, production, assets } from '../server'
import { makeQuery } from './graphql'
import ActivitiesPage from '../components/ActivitiesPage'
import App from '../components/App'
import Content from '../components/Content'

let app = express.Router()

app.get('/', (req, res, next) => {
  const posts = makeQuery(
    `
      {
        posts {
          slug
          title
          date
          tags
        }
      }
    `
  )
    .then((graphRes) => {
      const posts = graphRes.data.posts
      let content = renderToString(
        <App>
          <Content>
            <ActivitiesPage blogdata={posts} />
          </Content>
        </App>
      )
      res.send(
        layout({
          content,
          production,
          assets,
          title: 'All activities - Kevin Simper',
        })
      )
    })
    .catch(next)
})
export default app
