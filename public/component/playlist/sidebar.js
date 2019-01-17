import React, { Component } from 'react'
import { sidebar_icon } from './sidebar_icon'
import { Image, Dropdown } from 'semantic-ui-react'

const options = [{ key: 1, text: 'Choice 1', value: 1 }, { key: 2, text: 'Choice 2', value: 2 }]
class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }
  handle_option_button(e) {
    this.setState({ id: this.props.id })
    {
      console.log(this.state.id, this.props.id)
    }
    e.stopPropagation();
  }

  render() {[]
    return (
      <div className="sidebar">

        {/* <Image  onClick={(e) => this.handle_option_button(e)}></Image> */}
        <Dropdown  src={sidebar_icon} onClick={(e) => this.handle_option_button(e)} className='siderbar_icon'  text='More' options={options} />
      </div>
    )
  }
}

export default Sidebar