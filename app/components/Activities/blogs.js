import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'
import moment from 'moment'
import mediumLogo from './medium.png'
import Blogpost from '../Blogpost'

export default class Activities extends Component {
  render() {
    const { blogposts, limit } = this.props
    let allActivity = [].concat(blogposts).sort((a, b) => {
      if (moment(a.date).isBefore(b.date)) {
        return 1
      } else {
        return -1
      }
    })
    const _limit = limit || allActivity.length
    return (
      <div>
        {allActivity.slice(0, _limit).map((post, key) => {
          if (post.hasOwnProperty('slug')) {
            return <Blogpost post={post} key={key} />
          } else {
            return <Medium post={post} key={key} />
          }
        })}
      </div>
    )
  }
}
