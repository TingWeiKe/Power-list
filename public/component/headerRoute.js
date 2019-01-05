import React, { Component } from 'react'
import { Link, Redirect , withRouter } from 'react-router-dom'
import { Menu } from 'antd';


class HeaderRoute extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    //defaul Route
    this.props.match.path='/today'?null:this.props.history.push('/today')
  }
  render() {
    
    return (
      
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '50px', paddingRight:'20px' }}
      >
        <Menu.Item key="1"> <Link to="/today" />今日精選</Menu.Item>
        <Menu.Item key="2"><Link to="/playlist" />歌單</Menu.Item>
        <Menu.Item key="3"><Link to="/recents" />最近播放</Menu.Item>
        <Menu.Item key="4"><Link to="/setting" />設定</Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(HeaderRoute)
