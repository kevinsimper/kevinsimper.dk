import React, { Component } from 'react'
import styles from './style.scss'
import moment from 'moment'

export default class Blogposts extends Component {
  render() {
    return (
      <div className={styles.Blogposts}>
        {this.props.blogposts.map((post, id) =>
          <div className={styles.Post}>
            <a className='articlelink' href={'/posts/' + post.slug} key={id}>
              <div className={styles.Date}>{moment(new Date(post.date)).format('YYYY-MM-DD')} - {moment(new Date(post.date)).fromNow()}</div>
              <h3 className={styles.Header}>{post.title}</h3>
            </a>
          </div>
        )}
      </div>
    )
  }
}
