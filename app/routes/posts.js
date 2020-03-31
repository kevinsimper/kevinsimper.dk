import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import { makeQuery } from './graphql.js'
import App from '../components/App'
import Content from '../components/Content'

let app = express.Router()

const form = (
  <form
    style={{ margin: '20px 0' }}
    action="https://kevinsimper.us18.list-manage.com/subscribe/post?u=86d243154d55f1cdbc293d5bd&amp;id=a0e9448354"
    method="post"
    target="_blank"
  >
    <h3>Subscribe</h3>
    <div>I will write once a while about what I do!</div>
    <div style={{ display: 'flex', maxWidth: 500 }}>
      <input
        type="email"
        placeholder="youremail@mail.com"
        value=""
        onChange={() => {}}
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
          color: 'white',
          border: 0,
        }}
      />
    </div>
  </form>
)

app.get('/:post', (req, res, next) => {
  const slug = req.params.post

  makeQuery(
    `
      {
        post(slug: "${slug}") {
          slug
          title
          date
          tags
          content
          previousPosts(first: 1) {
            title
            slug
          }
          newerPosts(first: 1) {
            title
            slug
          }
        }
      }
    `
  )
    .then(({ data }) => {
      const {
        date,
        content,
        tags,
        newerPosts,
        previousPosts,
        title,
      } = data.post
      let outputcontent = renderToString(
        <App>
          <Content>
            <div>{date}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            Tags:{' '}
            {tags &&
              tags.map((t, id) => (
                <span key={id}>
                  <a href={`/categories/${t}`}>#{t}</a>{' '}
                </span>
              ))}
            <hr style={{ margin: '40px 0 0' }} />
            {form}
            <hr />
            <table style={{ margin: '20px 0' }}>
              {previousPosts.length > 0 && previousPosts[0] && (
                <tr>
                  <td>Previous&nbsp;post:</td>
                  <td>
                    <a href={`/posts/${previousPosts[0].slug}`}>
                      {previousPosts[0].title}
                    </a>
                  </td>
                </tr>
              )}
              {newerPosts.length > 0 && newerPosts[0] && (
                <tr>
                  <td>Newer&nbsp;post:</td>
                  <td>
                    <a href={`/posts/${newerPosts[0].slug}`}>
                      {newerPosts[0].title}
                    </a>
                  </td>
                </tr>
              )}
            </table>
          </Content>
        </App>
      )
      res.send(
        layout({
          content: outputcontent,
          production: production,
          assets,
          title: `${title} - Kevin Simper`,
        })
      )
    })
    .catch((e) => {
      next(e)
    })
})
export default app
