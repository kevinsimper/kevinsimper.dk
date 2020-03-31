import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Frontpage from '../components/Frontpage'
import Instagram from '../components/Instagram'
import { makeQuery } from './graphql'

function getPictures() {
  console.log('env', process.env.NODE_ENV)
  return Promise.resolve([])
  if (process.env.NODE_ENV === 'production') {
  } else {
    return Promise.resolve([])
  }
}

const data = getPictures()

export const homeRoute = (req, res, next) => {
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

  Promise.all([posts, data])
    .then((combined) => {
      const posts = combined[0].data.posts
      const images = combined[1]
      let content = renderToString(
        <App>
          <Instagram images={images} />
          <Frontpage images={images} blogdata={posts} />
        </App>
      )

      res.send(
        layout({
          content: content,
          production: production,
          assets,
          title: 'Kevin Simper - Full-Stack Developer',
        })
      )
    })
    .catch((e) => {
      console.log(e)
      next(new Error('Something happend!'))
    })
}
