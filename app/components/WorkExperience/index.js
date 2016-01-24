import React from 'react'
import data from './data.json'
import styles from './style.scss'

export default class WorkExperience extends React.Component {
  render() {
    return (
      <div>
        <h2>Work Experience</h2>
        <div className={styles.Experiences}>
          {data.experiences.map((item) => {
            return (
              <div className={styles.Experience}>
                <h3 className={styles.Company}>{item.company}</h3>
                <div>{item.title}</div>
                <div>{item.location}</div>
                <div>Started {item.start}</div>
              </div>
            )
          })}
      </div>
      </div>
    )
  }
}
