import React from 'react'
import styles from './style.scss'
import external from './external.svg'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <a href='/'><img className={styles.profilepic} src='https://2.gravatar.com/avatar/b120b6c94e16f352c691849391324206?s=440'/></a>
        <h1 className={styles.title}>
          <a href='/'>Kevin Simper</a>
        </h1>
        <h3 className={styles.subtitle}>
          JavaScript, Crafty.js and other coding.
        </h3>
        <div className={styles.Menu}>
          <a href='/'>Home</a>
          <a href='/about'>About</a>
          <a href='https://github.com/kevinsimper'>Github <img className={styles.External} src={external}/></a>
          <a href='https://twitter.com/kevinsimper'>Twitter <img className={styles.External} src={external}/></a>
          <a href='https://www.facebook.com/kevinsimper'>Facebook <img className={styles.External} src={external}/></a>
          <a href='https://linkedin.com/in/kevinsimper'>LinkedIn <img className={styles.External} src={external}/></a>
        </div>
      </div>
    )
  }
}
