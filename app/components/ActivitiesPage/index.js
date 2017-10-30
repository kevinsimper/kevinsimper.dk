import React, { Component } from 'react'
import HelloWorld from '../HelloWorld'
import Activities from '../Activities'
import Instagram from '../Instagram'

export default class ActivitiesPage extends Component {
  render() {
    return (
      <div>
        <Activities blogposts={this.props.blogdata} />
      </div>
    )
  }
}
