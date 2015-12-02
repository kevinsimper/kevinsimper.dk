import React from 'react'
import Sidebar from '../Sidebar'
import Content from '../Content'
import styles from './style.scss'

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Sidebar}>
          <div className={styles.Floating}>
            <Sidebar/>
          </div>
        </div>
        <div className={styles.Content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
