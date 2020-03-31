import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Content from '../components/Content'
import Nametags from '../components/Nametags'

export const NameTagsRoute = (req, res) => {
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
      title: 'Nametags - Kevin Simper',
    })
  )
}
