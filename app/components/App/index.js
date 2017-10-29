import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styles from './style.scss'

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <Header/>
        <div>{this.props.children}</div>
        <Footer/>
      </div>
    )
  }
}
