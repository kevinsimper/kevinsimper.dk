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
