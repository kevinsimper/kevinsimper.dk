import React, { Component } from 'react'

export default class Blogposts extends Component {
  render() {
    return (
      <div>
        <h2>Blogposts</h2>
        {this.props.blogposts.map(post =>
          <a className='articlelink' href={'/posts/' + post.slug}>
          <i className='date'>{post.date}</i>
          <h3 className='title'>{post.title}</h3>
          </a>
        )}
      </div>
    )
  }
}
