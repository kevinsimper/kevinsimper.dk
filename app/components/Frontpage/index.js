import React, { Component } from 'react'
import HelloWorld from '../HelloWorld'
import Activities from '../Activities'
import Instagram from '../Instagram'
import Content from '../Content'
import styles from './style.scss'

export default class Frontpage extends Component {
  render() {
    return (
      <div className={styles.Frontpage}>
        <div className={styles.Content}>
          <HelloWorld />
          <div style={{ background: '#03A9F4' }}>
            <Content>
              <h2 style={{ color: 'white' }}>
                <svg
                  height="30px"
                  version="1"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 500"
                  style={{
                    verticalAlign: -5,
                    marginRight: 10
                  }}
                >
                  <path
                    clipRule="evenodd"
                    d="M250 41c-8 0-15 5-17 13l-43 132H49c-9 0-17 9-17 19 0 6 3 11 7 14l114 83-43 133-1 6a18 18 0 0 0 27 15l114-83 114 83c2 2 6 3 10 3a18 18 0 0 0 16-24l-43-133 114-83c4-3 7-8 7-14 0-10-7-19-17-19H310L267 54c-2-8-9-13-17-13z"
                    fill="#ffe407"
                    fillRule="evenodd"
                    style={{
                      color: '#ffe407'
                    }}
                  />
                </svg>
                Upcoming events to find me
              </h2>
              <ul>
                {[
                  {
                    title: 'May 30th & June 1st - GR8conf',
                    link: 'https://gr8conf.eu/',
                    finished: true
                  },
                  {
                    title: 'June 1st & 2nd - JSConfEU',
                    link: 'https://2018.jsconf.eu/',
                    finished: true
                  },
                  {
                    title:
                      'June 7th - Learn Kubernetes - Best practices and showcases',
                    link:
                      'https://www.meetup.com/Google-Cloud-Developer-Community-Copenhagen/events/250877840/',
                    finished: true
                  },
                  {
                    title: 'June 19th - Introduction to Docker',
                    link:
                      'https://www.meetup.com/Docker-Copenhagen/events/251794160/',
                    finished: true
                  },
                  {
                    title: 'July 11th - Waffle.js',
                    link: 'https://wafflejs.com/?day=2018-07-11'
                  },
                  {
                    title: 'July 12th - SFNode',
                    link: 'https://www.meetup.com/sfnode/events/250440975/'
                  },
                  {
                    title: 'July 18th - CodeClimate Conference',
                    link: 'https://codeclimate.com/summit/'
                  },
                  {
                    title: 'July 24th & 26th - Google Cloud Next',
                    link: 'https://cloud.withgoogle.com/next18/sf/'
                  }
                ]
                  .filter(i => !i.finished)
                  .map((i, key) => (
                    <li key={key}>
                      <a style={{ color: 'white' }} href={i.link}>
                        {i.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </Content>
          </div>
          <iframe
            src="/map"
            height="440px"
            width="100%"
            style={{ border: 'none', marginBottom: -5 }}
          />
          <div style={{ background: '#b73a60' }}>
            <Content>
              <h2 style={{ color: 'white' }}>My latest videoes</h2>
              <div className={'embed'} style={{ margin: '20px 0' }}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/hSvuHBQ_7VE"
                  frameBorder="0"
                />
              </div>
              <div className={'embed'} style={{ margin: '20px 0' }}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Dnr8Mu1Bco4"
                  frameBorder="0"
                />
              </div>
              <div className={'embed'}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/eg4e-FObyJ8"
                  frameBorder="0"
                />
              </div>
            </Content>
          </div>
          <Content>
            <Activities limit={10} blogposts={this.props.blogdata} />
            <div style={{ textAlign: 'right' }}>
              <a href={'/activities'}>See the full list of activities →</a>
            </div>
          </Content>
        </div>
      </div>
    )
  }
}
