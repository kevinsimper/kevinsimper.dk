import React from 'react'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <img className='profilepic' src='https://2.gravatar.com/avatar/b120b6c94e16f352c691849391324206?s=440'/>
        <h1>
          <a href='/'>Kevin Simper</a>
        </h1>
        <h3>
          JavaScript, Crafty.js and other coding.
        </h3>
        <ul className='links'>
          <li>
            <a href='http://github.com/kevinsimper'>Github</a>
          </li>
          <li>
            <a href='http://twitter.com/kevinsimper'>Twitter</a>
          </li>
        </ul>
      </div>
    )
  }
}
