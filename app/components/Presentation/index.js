import React, { Component } from 'react'
import styles from './style.scss'

export default ({ presentation }) => (
  <div className={styles.Presentation} id={presentation.name}>
    <div className={styles.Name}>
      {presentation.name} <a href={'#' + presentation.name}>#</a>
    </div>
    <div className={styles.Location}>{presentation.location}</div>
    <div className={styles.Description}>{presentation.description}</div>
    <ul>
      {presentation.links &&
        presentation.links.map((link, key) => (
          <li key={key}>
            <a href={link.link}>{link.text}</a>
          </li>
        ))}
    </ul>
  </div>
)
