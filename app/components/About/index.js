import React from 'react'
import Presentations from '../Presentations'
import WorkExperience from '../WorkExperience'
import Groups from '../Groups'
import styles from './style.scss'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <div className={styles.Content}>
          <Presentations />
          <WorkExperience />
          <Groups />
        </div>
      </div>
    )
  }
}
