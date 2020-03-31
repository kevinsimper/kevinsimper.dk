import { get } from 'axios'
import { renderToString } from 'react-dom/server'
import React from 'react'
import express from 'express'
import { layout, production, assets } from '../server'
import App from '../components/App'
import Content from '../components/Content'

let app = express.Router()

const prod = process.env.NODE_ENV === 'production'

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Login</h1>
        <form method="get">
          <div>
            <label>
              <input type="email" placeholder="Email" name="email" />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </Content>
    </App>
  )
  res.send(
    layout({
      content,
      production,
      assets,
      title: 'Login - Kevin Simper',
    })
  )
})

app.get('/dashboard', (req, res) => {
  const { id } = req.signedCookies
  if (id === 'kevin.simper@gmail.com') {
    res.send('Hi Kevin')
  } else {
    res.send('Not allowed')
  }
})

export default app
