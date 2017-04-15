import express from 'express'
import compression from 'compression'
import layout from 'pug-loader!./layout.jade'
import map from 'pug-loader!./map/map.jade'
import blogdata from './blog/posts/_data.json'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './components/App'
import Content from './components/Content'
import About from './components/About'
import Contact from './components/Contact'
import Frontpage from './components/Frontpage'
import { get } from 'axios'

var app = express.Router();
var production = process.env.NODE_ENV === 'production'

var assets = global.assets

app.use(compression())

app.get('/', (req, res) => {
  let data = get('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + process.env.INSTAGRAM_TOKEN)
  data.then((instares) => {
    let images = instares.data.data.slice(0, 8)
    let content = renderToString(
      <App>
        <Content>
          <Frontpage images={images} blogdata={blogdata} />
        </Content>
      </App>
    )

    res.send(layout({
      content: content,
      production: production,
      assets,
      title: 'Kevin Simper - Front-end developer'
    }))
  }).catch((e) => {
    console.log(e)
    res.send('Instagram failed loading!')
  })
})

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogdata.find(item => item.slug === slug)
  var blogcontent = require('./blog/posts/' + slug + '.md')

  let content = renderToString(
    <App>
      <Content>
        <div dangerouslySetInnerHTML={{__html: blogcontent}}></div>
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production,
    assets,
    title: blogpost.title
  }))
})

app.get('/about', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <About/>
      </Content>
    </App>
  )
  res.send(layout({
    content,
    production,
    assets,
    title: 'CV and About Kevin Simper'
  }))
})

app.get('/contact', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <Contact/>
      </Content>
    </App>
  )
  res.send(layout({
    content,
    production,
    assets,
    title: 'Contact Kevin Simper'
  }))
})

app.get('/map', (req, res) => {
  res.send(map({
    production,
    assets
  }))
})

module.exports = app
