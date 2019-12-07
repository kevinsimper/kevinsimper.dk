import React from 'react'
import styles from './style.scss'
import menuIcon from './menu.svg'

export default function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderInner} id="mainmenu">
        <h1>
          <a href="/">Kevin Simper</a>
        </h1>
        <a id="toggleMenu" className={styles.ShowMenu}>
          <img src={menuIcon} />
        </a>
        <form method="GET" action="/search" className={styles.Search}>
          <input name="q" type="search" placeholder="Search.." />
        </form>
        <div className={styles.Menu}>
          <a href="/">Home</a>
          <a href="/about">About & CV</a>
          <a href="/contact">Contact</a>
          <a href="/map">Travel Map</a>
          <a href="/social">Social Media</a>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        toggleMenu.addEventListener('click', e => {
          mainmenu.classList.toggle('MenuShown')
        })
      `
        }}
      />
    </div>
  )
}
