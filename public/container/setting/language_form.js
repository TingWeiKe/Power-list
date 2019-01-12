import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { hadndle_Change_Language} from '../../redux/setting.redux'
import { connect } from 'react-redux'

 class laguage_form extends Component {
  constructor(props){
      super(props)
      this.state={
        language: '',

      }
  }
  handleChange (language)  {
      localStorage.setItem('language',language)
      this.setState({ language:language})
      this.props.hadndle_Change_Language(language)
      
}
componentWillMount(){
    this.setState({ language:this.props.data.setting.language})
}
  
  render() {

    return (
      <Form>

        <Form.Field>
          <Radio
            label='台灣'
            name='TW'
            value='TW'
            checked={this.state.language === 'TW'}
            onChange={()=>this.handleChange('TW')}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='香港'
            name='HK'
            value='HK'
            checked={this.state.language === 'HK'}
            onChange={()=>this.handleChange('HK')}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='新加坡'
            name='SG'
            value='SG'
            checked={this.state.language === 'SG'}
            onChange={()=>this.handleChange('SG')}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='馬來西亞'
            name='MY'
            value='MY'
            checked={this.state.language === 'MY'}
            onChange={()=>this.handleChange('MY')}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='日本'
            name='JP'
            value='JP'
            checked={this.state.language === 'JP'}
            onChange={()=>this.handleChange('JP')}
          />
        </Form.Field>
      </Form>
      
    )
  }
}

const mapStatetoProps = state => { return { data: state } }
const actionCreate = { hadndle_Change_Language }
laguage_form = connect(mapStatetoProps, actionCreate)(laguage_form)
export default laguage_form