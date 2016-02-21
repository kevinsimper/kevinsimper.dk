import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'
import moment from 'moment'
import mediumLogo from './medium.png'

export default class Activities extends Component {
  render() {
    return (
      <div>
        <h2>My latest activities</h2>
        {data.activities.map((post, key) =>
          <div className={styles.Post} key={key}>
            <div className={styles.Date}>{post.date} - {moment(post.date).fromNow()}</div>
            <h3 className={styles.Header}>
              <a href={post.link}>{post.title}</a>
            </h3>
            <div>Published on <img src={mediumLogo} className={styles.MediumLogo}/> Medium</div>
          </div>
        )}
      </div>
    )
  }
}
