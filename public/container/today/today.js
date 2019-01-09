import React, { Component } from 'react'
import Box from '../../component/box/box'

export default class Today extends Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    return (

      <div className="header">
        <h1>今日精選</h1>
        <Box />
      </div>
    )
  }
}
