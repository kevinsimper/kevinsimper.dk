import React, { Component } from 'react'
import HelloWorld from '../HelloWorld'
import Activities from '../Activities'
import Instagram from '../Instagram'

export default class ActivitiesPage extends Component {
  render() {
    return (
      <div>
        <h2>My latest activities</h2>
        <Activities blogposts={this.props.blogdata} />
      </div>
    )
  }
}
