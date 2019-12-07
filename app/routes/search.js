import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Content from '../components/Content'

export const SearchRoute = (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Search</h1>
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
}
