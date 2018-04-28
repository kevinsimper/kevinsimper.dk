import React, { Component } from 'react'
import Contactform from '../Contactform'

export default class Contact extends Component {
  render() {
    return (
      <div>
        <h1>Contact me</h1>
        <p>You are very welcome to contact me.</p>
        <Contactform />
      </div>
    )
  }
}
