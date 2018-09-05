import React from 'react'
import Presentations from '../Presentations'
import WorkExperience from '../WorkExperience'
import Groups from '../Groups'
import styles from './style.scss'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About me</h1>
        <p>My name Kevin and I like to make new stuff.</p>
        <h2>My biggest interests at the moment</h2>
        <p>
          <ul>
            <li>Virtual Reality</li>
            <li>Organizing community events</li>
            <li>Public speaking and teaching</li>
            <li>Ethereum and Crypto currencies</li>
            <li>Selfdriving cars and better movement</li>
            <li>React.js, ReasonML and Kubernetes</li>
          </ul>
        </p>
        <h2>Meetups I help organize</h2>
        <p>Check them out and join me!</p>
        <p>
          <ul>
            <li>Copenhagen.JS</li>
            <li>Docker Copenhagen</li>
            <li>Google Cloud Community Copenhagen</li>
          </ul>
        </p>
        <div className={styles.Content}>
          <div>
            <h2 className={styles.Header}>Presentations</h2>
            <div>
              I have done 30+ presentations at differnet meetups. It is something
              that I really like to do and wants to do more!
            </div>
            <Presentations limit={5} />
            <a href="about/presentations">See all my presentations</a>
          </div>
          <WorkExperience />
        </div>
      </div>
    )
  }
}
