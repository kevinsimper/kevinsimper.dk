import React from 'react'
import styles from './style.scss'
import Kubernetes from './kubernetes.svg'
import Smiley from './smiley.png'
import Nerd from './nerd.png'
import Rocket from './rocket.png'
import Docker from './docker.png'

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.HelloWorld}>
          <div className={styles.Intro}>
          Hi <img src={Smiley} className={styles.Smiley}/>, my name is <strong>Kevin Simper</strong> <img src={Nerd} className={styles.Smiley}/> and I am a full stack developer. I really like <strong>React.js</strong> <img src={Rocket} className={styles.Smiley}/>, <strong>Docker</strong> <img src={Docker} className={styles.Smiley}/> and <strong>Kubernetes</strong> <img src={Kubernetes} className={styles.Smiley}/>.
          </div>
          <div className={styles.SecondIntro}>
          I also like to organize meetups and make <a href="/about">presentations</a> 💻. I really like to snowboard 🏂, and bicycles is my prefered transportation 🚴.
          </div>
        </div>
        <h2>My latest travels</h2>
        <iframe src='/map' height='300px' width='100%' style={{border: 'none', marginTop: 20}}></iframe>
      </div>
    )
  }
}
