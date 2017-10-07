import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'

export default class Presentations extends Component {
  render() {
    return (
      <div>
        <h2 className={styles.Header}>Presentations</h2>
        <div>
          I have done <strong>{data.presentations.length}</strong> presentations
          at differnet meetups. It is something that I really like to do and
          wants to do more!
        </div>
        <div className={styles.Presentations}>
          {data.presentations.map(presentation => {
            return (
              <div className={styles.Presentation}>
                <div className={styles.Name}>{presentation.name}</div>
                <div className={styles.Location}>{presentation.location}</div>
                <div className={styles.Description}>
                  {presentation.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
