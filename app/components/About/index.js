import React from 'react'
import Presentations from '../Presentations'
import WorkExperience from '../WorkExperience'
import Groups from '../Groups'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <Presentations/>
        <WorkExperience/>
        <Groups/>
      </div>
    )
  }
}
