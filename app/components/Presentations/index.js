import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'

export default class Presentations extends Component {
  render() {
    return (
      <div>
        <h2>Presentations</h2>
        <div>
          {data.presentations.map((presentation) => {
            return (
              <div>
                <div className={styles.Name}>{presentation.name}</div>
                <div className={styles.Location}>{presentation.location}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
