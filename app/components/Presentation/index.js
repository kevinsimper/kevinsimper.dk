import React, { Component } from 'react'
import styles from './style.scss'

export default ({ presentation }) => (
  <div className={styles.Presentation}>
    <div className={styles.Name}>{presentation.name}</div>
    <div className={styles.Location}>{presentation.location}</div>
    <div className={styles.Description}>{presentation.description}</div>
    <ul>
      {presentation.links &&
        presentation.links.map((link, key) => (
          <li key={key}>
            <a href={link[1]}>{link[0]}</a>
          </li>
        ))}
    </ul>
  </div>
)
