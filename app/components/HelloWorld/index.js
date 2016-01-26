import React from 'react'
import styles from './style.scss'

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className={styles.HelloWorld}>
        Hi 😄, my name is <strong>Kevin Simper</strong> 🤓 and I am a full stack developer. I really like <strong>React.js</strong> 🚀 and <strong>Docker</strong> 🐳.
      </div>
    )
  }
}
