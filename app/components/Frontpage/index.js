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
          <div style={{ background: '#3D9970'}}>
            <Content>
              <h2 style={{ color: 'white' }}>Upcoming events</h2>
              <ul>
                <li><a style={{color: 'white'}} href="https://www.meetup.com/copenhagenjs/events/250104025/">May 24th - CopenhagenJS May</a></li>
                <li><a style={{color: 'white'}} href="https://gr8conf.eu/">May 30th & June 1st - GR8conf</a></li>
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
