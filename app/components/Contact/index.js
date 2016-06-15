import React, { Component } from 'react'
import styles from './style.scss'

export default class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <form action="https://formspree.io/kevin.simper@gmail.com"
            method="POST">
          <label className={styles.Label}>Message</label>
          <textarea className={styles.Textarea} name="Message"/>
          <label className={styles.Label}>Name</label>
          <input className={styles.Input}type="text" name="Name"/>
          <label className={styles.Label}>Email that I will respond to</label>
          <input className={styles.Input}type="email" name="_replyto"/>
          <div>
            <input className={styles.Submit} type="submit" value="Send"/>
          </div>
        </form>
      </div>
    )
  }
}
