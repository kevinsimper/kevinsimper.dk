import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import Recommends from '../components/Recommends'
import { layout, production, assets } from '../server'
import blogdata from '../blog/posts/_data.json'
let app = express.Router()

app.get('/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogdata.find(item => item.slug === slug)
  const previous = blogdata[blogdata.indexOf(blogpost) + 1]
  const newer = blogdata[blogdata.indexOf(blogpost) - 1]
  import('../blog/posts/' + slug + '.md').then(blogcontent => {
    let content = renderToString(
      <App>
        <Content>
          <div>{blogpost.date}</div>
          <div dangerouslySetInnerHTML={{ __html: blogcontent.default }} />
          <hr />
          {previous && (
            <p>
              Previous post:{' '}
              <a href={`/posts/${previous.slug}`}>{previous.title}</a>
            </p>
          )}
          {newer && (
            <p>
              Newer post: <a href={`/posts/${newer.slug}`}>{newer.title}</a>
            </p>
          )}
        </Content>
      </App>
    )

    res.send(
      layout({
        content: content,
        production: production,
        assets,
        title: `${blogpost.title} - Kevin Simper`
      })
    )
  })
})
export default app
