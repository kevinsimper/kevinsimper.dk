import React, { Component } from 'react'
import HelloWorld from '../HelloWorld'
import Blogposts from '../Blogposts'
import Activities from '../Activities'
import Instagram from '../Instagram'
import styles from './style.scss'

export default class Frontpage extends Component {
  render() {
    return (
      <div className={styles.Frontpage}>
        <div className={styles.Content}>
          <HelloWorld/>
          <Activities blogposts={this.props.blogdata}/>
        </div>
        <div className={styles.Images}>
          <Instagram images={this.props.images}/>
        </div>
      </div>
    )
  }
}
