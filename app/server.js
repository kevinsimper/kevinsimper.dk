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
import ActivitiesPage from './components/ActivitiesPage'
import KubernetesTraining from './components/KubernetesTraining'
import { get } from 'axios'
import Recommends from './components/Recommends'

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

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogdata.find(item => item.slug === slug)
  import('./blog/posts/' + slug + '.md').then(blogcontent => {
    let content = renderToString(
      <App>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: blogcontent.default }} />
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

app.get('/activities', (req, res) => {
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

app.get('/kubernetes-training', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <KubernetesTraining />
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Kubernetes Training - Kevin Simper'
    })
  )
})

app.get('/recommends', (req, res) => {
  let content = renderToString(
    <App>
      <Recommends />
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Recommends - Kevin Simper'
    })
  )
})

app.get('/login', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Login</h1>
        <div>
          <label>
            <input type="text" placeholder="username" name="username" />
          </label>
        </div>
        <div>
          <label>
            <input type="password" placeholder="password" name="password" />
          </label>
        </div>
        <div>
          <button>Login</button>
        </div>
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Login - Kevin Simper'
    })
  )
})

module.exports = app
