import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Content from '../components/Content'

export const SocialMediaRoute = (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Find me on social media</h1>
        <ul>
          <li>
            <a href="https://github.com/kevinsimper">Github</a>
          </li>
          <li>
            <a href="https://twitter.com/kevinsimper">Twitter</a>
          </li>
          <li>
            <a href="https://www.facebook.com/kevinsimper">Facebook</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/kevinsimper">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCarQbOR6-lCqaa0d_MB9iGQ">
              YouTube
            </a>
          </li>
        </ul>
      </Content>
    </App>
  )

  res.send(
    layout({
      content: content,
      production: production,
      assets,
      title: 'Social Media - Kevin Simper',
    })
  )
}
