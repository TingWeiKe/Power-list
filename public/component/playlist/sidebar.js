import React, { Component } from 'react'
import { Image, Dimmer } from 'semantic-ui-react'
import { sidebar_icon } from './sidebar_icon'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }
  
  handle_option_button(e) {
    this.setState({ id: this.props.id })
    e.stopPropagation();
  }

  render() {
    return (
      <div className="sidebar">
        <div className="dropdown" style={{ Float: 'left' }}>
          <Image className='sidebar_icon' src={sidebar_icon} onClick={(e) => this.handle_option_button(e)}></Image>
          <div className="dropdown-content" style={{}}>
            <a onClick={(e) => this.props.handle_mylist_button(e)}>匯入至我的歌單</a>
            <a href={this.props.tracks_url}>在KKBOX上播放</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar