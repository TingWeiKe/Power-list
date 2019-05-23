import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
export default class refresh_button extends Component {
  render() {
    return (
        <div className='refresh_button'>
        <Button primary size='big' >重新整理</Button>
        </div>
    )
  }
}


