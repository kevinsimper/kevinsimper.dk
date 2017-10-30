import React, { Component } from 'react'
import HelloWorld from '../HelloWorld'
import Activities from '../Activities'
import Instagram from '../Instagram'
import styles from './style.scss'

export default class Frontpage extends Component {
  render() {
    return (
      <div className={styles.Frontpage}>
        <div className={styles.Content}>
          <HelloWorld />
          <Activities limit={10} blogposts={this.props.blogdata} />
          <div style={{textAlign: 'right'}}>
            <a href={'/activities'}>See the full list of activities →</a>
          </div>
        </div>
      </div>
    )
  }
}
