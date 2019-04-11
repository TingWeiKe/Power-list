import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class setting extends Component {

  componentWillMount(){
    this.props.history.goBack()
  }
  render() {
    return (
      <div className="container_header">
      </div>
    )
  }
}


export default withRouter(setting)