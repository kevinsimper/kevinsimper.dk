import React from 'react'
import Sidebar from '../Sidebar'
import Content from '../Content'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-4 sidebar">
            <Sidebar/>
          </div>
        </div>
        <div className="pure-u-3-4 content">
          <div className="innercontent">
            <div className="pure-u-5-6">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
