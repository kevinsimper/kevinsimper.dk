import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import Layout from './components/Layout'
import Map from './components/Map'
import blogdata from './blog/posts/_data.json'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import App from './components/App'
import Content from './components/Content'
import Instagram from './components/Instagram'
import About from './components/About'
import Contact from './components/Contact'
import Frontpage from './components/Frontpage'
import KubernetesTraining from './components/KubernetesTraining'
import Nametags from './components/Nametags'
import Presentations from './components/Presentations'
import { get } from 'axios'
import Recommends from './components/Recommends'
import LoginRoutes from './routes/login'
import RecommendsRoutes from './routes/recommends'
import AboutRoutes from './routes/about'
import ContactRoutes from './routes/contact'
import KubernetesTrainingRoutes from './routes/kubernetes-training'
import PostsRoutes from './routes/posts'
import MapRoutes from './routes/map'
import ActivitiesRoutes from './routes/activities'
import CategoriesRoutes from './routes/categories'
import FeedRoutes from './routes/feed'

var app = express.Router()
var production = process.env.NODE_ENV === 'production'
exports.production = production
var assets = global.assets
exports.assets = assets

app.use(compression())
app.use(cookieParser('somethingverysecret'))

if (production) {
  app.use((req, res, next) => {
    const host = req.header('host')
    if (!host.match(/^www\..*/i) && host === 'kevinsimper.dk') {
      res.redirect(301, 'https://www.' + host)
    } else {
      next()
    }
  })
}

function layout(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Layout {...props} />)}
  `
}
exports.layout = layout
function map(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Map {...props} />)}
  `
}
exports.map = map

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

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
