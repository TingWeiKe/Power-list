import React, { Component } from 'react'
import Box from '../../component/box/box'

export default class Today extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>今日精選</h1>
        <Box>
        </Box>
        
      </div>
    )
  }
}
