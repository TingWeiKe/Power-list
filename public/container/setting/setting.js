import React, { Component } from 'react'
import Language_form from './language_form'
import { connect } from 'react-redux'



class setting extends Component {

  
  render() {
    
    return (
      <div className="header">
        <h1>設定</h1>
        <Language_form></Language_form>
      </div>

    )
  }
}


export default setting