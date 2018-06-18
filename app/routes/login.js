import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import { layout, production, assets } from '../server'
let app = express.Router()

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Login</h1>
        <div>
          <label>
            <input type="text" placeholder="username" name="username" />
          </label>
        </div>
        <div>
          <label>
            <input type="password" placeholder="password" name="password" />
          </label>
        </div>
        <div>
          <button>Login</button>
        </div>
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Login - Kevin Simper'
    })
  )
})

export default app
