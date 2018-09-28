import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import Content from '../components/Content'
import { layout, production, assets } from '../server'
import { get } from 'axios'
let app = express.Router()

const prod = process.env.NODE_ENV === 'production'
const fbappid = '196260264266521'
const secret = process.env.ACCOUNTKIT_SECRET
const redirect = prod ? 'https://www.kevinsimper.dk/login/accountkit' : 'http://localhost:9000/login/accountkit'
const accountkitToken = `AA|${fbappid}|${secret}`

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <h1>Login</h1>
        <form method="get" action="https://www.accountkit.com/v1.0/basic/dialog/email_login/">
          <input type="hidden" name="app_id" value="196260264266521"/>
          <input type="hidden" name="redirect" value={redirect}/>
          <input type="hidden" name="state" value="asdfsasd"/>
          <input type="hidden" name="fbAppEventsEnabled" value="true"/>
          <input type="hidden" name="debug" value="true"/>
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
      title: 'Login - Kevin Simper'
    })
  )
})

app.get('/accountkit',  (req, res) => {
  const { code, state, status } = req.query
  const accessToken = `https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=${code}&access_token=${accountkitToken}`
  get(accessToken).then(response => {
    const { id, access_token } = response.data
    const meUrl = `https://graph.accountkit.com/v1.3/me/?access_token=${access_token}`
    return get(meUrl)
  }).then(response => {
    const email = response.data.email.address
    req.signedCookies.email = email
    res.cookie('id', email, { signed: true })
    res.redirect('/login/dashboard')
  }).catch(e => console.log(e))
})

app.get('/dashboard', (req, res) => {
  const { id } = req.signedCookies
  if(id === 'kevin.simper@gmail.com') {
    res.send('Hi Kevin')
  } else {
    res.send('Not allowed')
  }
})

export default app
