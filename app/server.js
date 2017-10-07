import express from 'express'
import compression from 'compression'
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
import { get } from 'axios'

var app = express.Router()
var production = process.env.NODE_ENV === 'production'

var assets = global.assets

app.use(compression())

if (production) {
  app.use((req, res, next) => {
    const host = req.header('host')
    if (host.match(/^www\..*/i)) {
      next()
    } else {
      res.redirect(301, 'https://www.' + host)
    }
  })
}

function layout(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Layout {...props} />)}
  `
}
function map(props) {
  return `<!DOCTYPE html>
  ${renderToStaticMarkup(<Map {...props} />)}
  `
}

function getPictures() {
  console.log('env', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    return get(
      'https://api.instagram.com/v1/users/self/media/recent/?access_token=' +
        process.env.INSTAGRAM_TOKEN
    ).then(data => {
      return data.data.data.slice(0, 10)
    })
  } else {
    return Promise.resolve([])
  }
}

app.get('/', (req, res, next) => {
  console.log(req)
  let data = getPictures()
  data
    .then(images => {
      let content = renderToString(
        <App>
          <Instagram images={images} />
          <Content>
            <Frontpage images={images} blogdata={blogdata} />
          </Content>
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

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogdata.find(item => item.slug === slug)
  var blogcontent = require('./blog/posts/' + slug + '.md')

  let content = renderToString(
    <App>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: blogcontent }} />
      </Content>
    </App>
  )

  res.send(
    layout({
      content: content,
      production: production,
      assets,
      title: blogpost.title
    })
  )
})

app.get('/about', (req, res) => {
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

app.get('/contact', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <Contact />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Contact Kevin Simper'
    })
  )
})

app.get('/map', (req, res) => {
  res.send(
    map({
      production,
      assets
    })
  )
})

module.exports = app
