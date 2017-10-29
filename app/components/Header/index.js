import React from 'react'
import styles from './style.scss'

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderInner} id='mainmenu'>
        <h1>
          <a href="/">Kevin Simper</a>
        </h1>
        <button id="toggleMenu" className={styles.ShowMenu}>Show Menu</button>
        <div className={styles.Menu}>
          <a href="/">Home</a>
          <a href="/about">About & CV</a>
          <a href="/contact">Contact</a>
          <a href="/map">Travel Map</a>
          <a href="https://github.com/kevinsimper">Github</a>
          <a href="https://twitter.com/kevinsimper">Twitter</a>
          <a href="https://www.facebook.com/kevinsimper">Facebook</a>
          <a href="https://linkedin.com/in/kevinsimper">LinkedIn</a>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{__html: `
        toggleMenu.addEventListener('click', e => {
          mainmenu.classList.toggle('MenuShown')
        })
      `}} />
    </div>
  )
}
