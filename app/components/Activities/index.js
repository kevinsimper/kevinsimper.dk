import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'
import moment from 'moment'
import mediumLogo from './medium.png'
import Blogpost from '../Blogpost'

function Medium (props) {
  const { post } = props
  return (
    <div className={styles.Post}>
      <div className={styles.Date}>{post.date} - {moment(post.date).fromNow()}</div>
      <h3 className={styles.Header}>
        <a href={post.link}>{post.title}</a>
      </h3>
      <div>Published on <img src={mediumLogo} className={styles.MediumLogo}/> Medium</div>
    </div>
  )
}

export default class Activities extends Component {
  render() {
    const { blogposts } = this.props
    let allActivity = [].concat(data.activities, blogposts)
      .sort((a,b) => {
        if(moment(a.date).isBefore(b.date)) {
          return 1
        } else {
          return -1
        }
      })
    return (
      <div>
        <h2>My latest activities</h2>
        {allActivity.map((post, key) => {

          if(post.hasOwnProperty('slug')) {
            return <Blogpost post={post} key={key}/>
          } else {
            return <Medium post={post} key={key}/>
          }
        })}
      </div>
    )
  }
}
