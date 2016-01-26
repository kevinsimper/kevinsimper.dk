import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'
import Card from 'material-ui/lib/card/card'

export default class Presentations extends Component {
  render() {
    return (
      <div>
        <h2 className={styles.Header}>Presentations</h2>
        <div>These are the presentations I have done.</div>
        <div className={styles.Presentations}>
          {data.presentations.map((presentation) => {
            return (
              <Card className={styles.Presentation}>
                <div className={styles.Name}>{presentation.name}</div>
                <div className={styles.Location}>{presentation.location}</div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}
