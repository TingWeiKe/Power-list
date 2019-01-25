import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import { sidebar_icon } from './sidebar_icon'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }
  
  handle_option_button(e) {
  
    let name = this.props.name.name
    console.log(name);
    this.props.handle_mylist_button(e,name)
    this.setState({ id: this.props.id })
    e.stopPropagation();
  }

  render() {
    return (
      <div className="sidebar">
        <div className="dropdown" style={{ Float: 'left' }}>
          <Image className='sidebar_icon' src={sidebar_icon} onClick={(e) => this.handle_option_button(e)}></Image>
          <div className="dropdown-content" style={{}}>
            <a onClick={ e => this.props.handle_mylist_button(e ,this.props.id )}>匯入至SPOTIFY歌單</a>
            <a onClick={ e =>{e.stopPropagation()}} href={this.props.tracks_url}>在KKBOX上播放</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar