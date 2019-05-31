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
            <li>
              <a href="/categories/kubernetes">Kubernetes</a> and Google Cloud
            </li>
            <li>Organizing community events</li>
            <li>Public speaking and teaching</li>
            <li>Ethereum and Crypto currencies</li>
            <li>
              <a href="/categories/vr">Virtual Reality</a>
            </li>
            <li>Selfdriving cars and better movement</li>
          </ul>
        </p>
        <h2>Meetups I help organize</h2>
        <p>Check them out and join me!</p>
        <p>
          <ul>
            <li>
              <a href="https://copenhagenjs.dk">CopenhagenJS</a>
            </li>
            <li>
              <a href="https://www.meetup.com/Google-Cloud-Developer-Community-Copenhagen/">
                GDG Cloud Copenhagen
              </a>
            </li>
          </ul>
        </p>
        <div className={styles.Content}>
          <div>
            <h2 className={styles.Header}>Presentations</h2>
            <p>
              I have done 30+ presentations at differnet meetups. It is
              something that I really like to do and wants to do more!
            </p>
            <p>Here is the latest 5 presentations:</p>
            <Presentations limit={5} />
            <a href="about/presentations">See all my presentations</a>
          </div>
          <WorkExperience />
        </div>
        <div>
          <h2 className={styles.Header}>Certifications</h2>
          <p>I am a Google Cloud Professionel Cloud Architect.</p>
          <p>
            Proof can be seen here:{' '}
            <a href="https://www.credential.net/gifyqget?key=5db5c6df3703061c8d4de82373a4bfd51f681c36f10caedf031dcb4fd6da6f25">
              https://www.credential.net/gifyqget?key=5db5c6df3703061c8d4de82373a4bfd51f681c36f10caedf031dcb4fd6da6f25
            </a>
          </p>
        </div>
      </div>
    )
  }
}
