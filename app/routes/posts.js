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
          <hr style={{ margin: '40px 0 0' }} />
          <form
            style={{ margin: '20px 0' }}
            action="https://kevinsimper.us18.list-manage.com/subscribe/post?u=86d243154d55f1cdbc293d5bd&amp;id=a0e9448354"
            method="post"
            target="_blank"
          >
            <h3>Subscribe</h3>
            <div>I will write once a while about what I do!</div>
            <div style={{ display: 'flex' }}>
              <input
                type="email"
                placeholder="youremail@mail.com"
                value=""
                name="EMAIL"
                style={{ width: '100%', fontSize: '1rem', padding: '0 10px' }}
              />
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                style={{
                  fontSize: '1rem',
                  padding: 15,
                  background: '#4CAF50',
                  color: 'white'
                }}
              />
            </div>
          </form>
          <hr />
          <table style={{ margin: '20px 0' }}>
            {previous && (
              <tr>
                <td>Previous&nbsp;post:</td>
                <td>
                  <a href={`/posts/${previous.slug}`}>{previous.title}</a>
                </td>
              </tr>
            )}
            {newer && (
              <tr>
                <td>Newer&nbsp;post:</td>
                <td>
                  <a href={`/posts/${newer.slug}`}>{newer.title}</a>
                </td>
              </tr>
            )}
          </table>
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
