import React, { Component } from 'react'
import styles from './style.scss'

export default class Instagram extends Component {
  render() {
    const { images } = this.props
    return (
      <div className={styles.Instagram}>
        {images.map(image => {
          return (
            <div style={{backgroundImage: `url(${image.images.low_resolution.url})`}}>
            </div>
          )
        })}
      </div>
    )
  }
}
