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
          markdown
        }
      }
    `
  )
    .then((graphRes) => {
      const posts = graphRes.data.search
      const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      let content = renderToString(
        <App>
          <Content>
            <h1>Search - {query}</h1>
            <form method="GET" action="/search">
              <input
                style={{
                  fontSize: '1.5rem',
                  padding: '5px 10px',
                  border: '1px solid grey',
                }}
                name="q"
                type="search"
                placeholder="Search.."
                value={query}
              />
            </form>
            <p>Found {posts.length} results.</p>
            <div>
              {posts.map((p, key) => {
                return (
                  <div key={key}>
                    <h3 style={{ margin: '16px 0 6px' }}>
                      <a href={`/posts/${p.slug}`}>{p.title}</a>
                    </h3>
                    <div>
                      <i>{formatter.format(new Date(p.date))}</i> -{' '}
                      {p.markdown.slice(0, 200)}
                    </div>
                  </div>
                )
              })}
            </div>
          </Content>
        </App>
      )

      res.send(
        layout({
          content: content,
          production: production,
          assets,
          title: 'Search - Kevin Simper',
        })
      )
    })
    .catch(next)
}
