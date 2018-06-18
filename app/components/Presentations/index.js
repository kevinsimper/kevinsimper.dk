import React, { Component } from 'react'
import data from './data.json'
import styles from './style.scss'

const Presentation = ({ presentation }) => (
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
          {data.presentations.map((presentation, key) => {
            return <Presentation presentation={presentation} key={key} />
          })}
        </div>
      </div>
    )
  }
}
