import { renderToString } from 'react-dom/server'
import React from 'react'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'

import { assets, production, layout, map } from './consts.js'
import { server } from './routes/graphql'
import AboutRoutes from './routes/about'
import ActivitiesRoutes from './routes/activities'
import App from './components/App'
import CategoriesRoutes from './routes/categories'
import ContactRoutes from './routes/contact'
import Content from './components/Content'
import FeedRoutes from './routes/feed'
import Frontpage from './components/Frontpage'
import Instagram from './components/Instagram'
import KubernetesTrainingRoutes from './routes/kubernetes-training'
import LoginRoutes from './routes/login'
import MapRoutes from './routes/map'
import Nametags from './components/Nametags'
import PostsRoutes from './routes/posts'
import RecommendsRoutes from './routes/recommends'
import blogdata from './blog/posts/_data.json'

export { assets, production, layout, map }
var app = express.Router()

app.use(compression())
app.use(cookieParser('somethingverysecret'))

if (production) {
  app.use((req, res, next) => {
    const host = req.header('host')
    if (
      req.header('X-Forwarded-Proto') &&
      req.header('X-Forwarded-Proto') === 'http'
    ) {
      res.redirect(301, 'https://' + host + req.originalUrl)
    }
    if (!host.match(/^www\..*/i) && host === 'kevinsimper.dk') {
      res.redirect(301, 'https://www.' + host + req.originalUrl)
    } else {
      next()
    }
  })
}

function getPictures() {
  console.log('env', process.env.NODE_ENV)
  return Promise.resolve([])
  if (process.env.NODE_ENV === 'production') {
  } else {
    return Promise.resolve([])
  }
}

const data = getPictures()
app.get('/', (req, res, next) => {
  data
    .then(images => {
      let content = renderToString(
        <App>
          <Instagram images={images} />
          <Frontpage images={images} blogdata={blogdata} />
        </App>
      )

      res.send(
        layout({
          content: content,
          production: production,
          assets,
          title: 'Kevin Simper - Full-Stack Developer'
        })
      )
    })
    .catch(e => {
      console.log(e)
      next(new Error('Something happend!'))
    })
})

app.use('/posts', PostsRoutes)
app.use('/about', AboutRoutes)
app.use('/contact', ContactRoutes)
app.use('/map', MapRoutes)
app.use('/kubernetes-training', KubernetesTrainingRoutes)
app.use('/recommends', RecommendsRoutes)
app.use('/login', LoginRoutes)
app.use('/activities', ActivitiesRoutes)
app.use('/categories', CategoriesRoutes)
app.use('/feed', FeedRoutes)
app.get('/nametags', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <Nametags />
      </Content>
    </App>
  )

  res.send(
    layout({
      content: content,
      production: production,
      assets,
      title: 'Nametags - Kevin Simper'
    })
  )
})

server.applyMiddleware({ app })

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export { app }
