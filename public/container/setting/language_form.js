import React, { Component } from 'react'
import { Form, Radio, Dropdown, Menu } from 'semantic-ui-react'
import { hadndle_Change_Language } from '../../redux/setting.redux'
import {handle_Init_State} from '../../redux/box.redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './language_form.css'
class language_form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: '',
    }
  }
  handleChange(language) {
    this.props.handle_Init_State()
    this.props.hadndle_Change_Language(language)
    localStorage.setItem('language', language)
    this.props.history.push('/setting')

  }
  componentWillMount() {
    this.setState({ language: this.props.data.setting.language })
  }

  render() {
    
    return (
      <Dropdown item text={'地區：'+localStorage.getItem('language')}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => { this.handleChange('TW') }}>台灣</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.handleChange('HK') }}>香港</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.handleChange('SG') }}>新加坡</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.handleChange('MY') }}>馬來西亞</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.handleChange('JP') }}>日文</Dropdown.Item>
        </Dropdown.Menu>
  </Dropdown>
      
    )
  }
}

const mapStatetoProps = state => { return { data: state } }
const actionCreate = { hadndle_Change_Language,handle_Init_State }

export default withRouter(connect(mapStatetoProps, actionCreate)(language_form))