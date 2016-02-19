import React from 'react'
import styles from './style.scss'

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className={styles.HelloWorld}>
        <div className={styles.Intro}>
          Hi 😄, my name is <strong>Kevin Simper</strong> 🤓 and I am a full stack developer. I really like <strong>React.js</strong> 🚀 and <strong>Docker</strong> 🐳.
        </div>
        <div className={styles.SecondIntro}>
          I also like to organize meetups and make <a href="/about">presentations</a> 💻. I really like to snowboard 🏂, and bicycles is my prefered transportation 🚴.
        </div>
      </div>
    )
  }
}
