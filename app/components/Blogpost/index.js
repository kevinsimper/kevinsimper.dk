import React, { Component } from 'react'
import styles from './style.scss'
import moment from 'moment'

export default class Blogpost extends Component {
  render() {
    const { post } = this.props
    return (
      <div className={styles.Post}>
        <a className="articlelink" href={'/posts/' + post.slug}>
          <div className={styles.Date}>
            {moment(new Date(post.date)).format('YYYY-MM-DD')} -{' '}
            {moment(new Date(post.date)).fromNow()}
          </div>
          <h3 className={styles.Header}>{post.title}</h3>
          <h4 className={styles.Categories}>
            {post.tags &&
              post.tags.map((t, id) => (
                <span key={id}>
                  <a href={`/categories/${t}`}>#{t}</a>{' '}
                </span>
              ))}
          </h4>
        </a>
      </div>
    )
  }
}
