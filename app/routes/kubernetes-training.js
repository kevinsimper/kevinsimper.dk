import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'

import { layout, production, assets } from '../server'
import App from '../components/App'
import Content from '../components/Content'
import KubernetesTraining from '../components/KubernetesTraining'

let app = express.Router()

app.get('/', (req, res) => {
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

export default app
