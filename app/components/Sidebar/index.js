import React from 'react'
import styles from './style.scss'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <img className={styles.profilepic} src='https://2.gravatar.com/avatar/b120b6c94e16f352c691849391324206?s=440'/>
        <h1 className={styles.title}>
          <a href='/'>Kevin Simper</a>
        </h1>
        <h3 className={styles.subtitle}>
          JavaScript, Crafty.js and other coding.
        </h3>
        <div  className={styles.links}>
          <div className={styles.link}>
            <a href='https://github.com/kevinsimper'>Github</a>
          </div>
          <div className={styles.link}>
            <a href='https://twitter.com/kevinsimper'>Twitter</a>
          </div>
          <div className={styles.link}>
          <a href='https://www.facebook.com/kevinsimper'>Facebook</a>
          </div>
          <div className={styles.link}>
            <a href='https://linkedin.com/in/kevinsimper'>LinkedIn</a>
          </div>
        </div>
      </div>
    )
  }
}
