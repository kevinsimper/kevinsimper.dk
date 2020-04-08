import { renderToString } from 'react-dom/server'
import React from 'react'
import { layout, production, assets } from '../consts'
import App from '../components/App'
import Content from '../components/Content'

export const ProjectsRoute = (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Projects that I work on</h1>
        <ul>
          <li>
            <a href="https://gdgsearch.com/">GDG Search</a>
          </li>
          <li>
            <a href="https://contactform.dk/">Contactform.dk</a>
          </li>
          <li>
            <a href="https://talkfrom.com/">Talkfrom</a>
          </li>
          <li>
            <a href="https://copenhagen.community/">Copenhagen.community</a>
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
      title: 'Projects - Kevin Simper',
    })
  )
}
