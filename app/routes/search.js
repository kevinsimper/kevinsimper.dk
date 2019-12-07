import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Content from '../components/Content'
import { makeQuery } from './graphql'

export const SearchRoute = (req, res, next) => {
  const query = req.query.q
  const posts = makeQuery(
    `
      {
        search(query: "${query}") {
          slug
          title
          date
          tags
        }
      }
    `
  )
    .then(graphRes => {
      const posts = graphRes.data.search
      let content = renderToString(
        <App>
          <Content>
            <h1>Search - {query}</h1>
            <ul>
              {posts.map(p => (
                <li>
                  <a href={`/posts/${p.slug}`}>{p.title}</a>
                </li>
              ))}
            </ul>
          </Content>
        </App>
      )

      res.send(
        layout({
          content: content,
          production: production,
          assets,
          title: 'Search - Kevin Simper'
        })
      )
    })
    .catch(next)
}
