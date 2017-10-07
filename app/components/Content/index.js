import React from 'react'
import styles from './styles.scss'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.Content}>
        {this.props.children}
      </div>
    )
  }
}
