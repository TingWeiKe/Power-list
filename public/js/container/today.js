import React, { Component } from 'react'

export default class Today extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <h1>今日精選</h1>
    )
  }
}
