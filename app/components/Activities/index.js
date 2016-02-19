import React, { Component } from 'react'
import data from './data.json'

export default class Activities extends Component {
  render() {
    return (
      <div>
        <h2>My latest activities</h2>
        {data.activities.map(post =>
          <div style={{marginBottom: 10}}>
            <a className="m-story" data-width="100%" data-collapsed="true" href={post.link}>No, I will not cross-promote your event!</a>
          </div>
        )}
        <script async src="https://static.medium.com/embed.js"></script>
      </div>
    )
  }
}
