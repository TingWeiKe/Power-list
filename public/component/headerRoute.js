import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Menu } from 'antd';
import Today from '../container/today'


export default class headerRoute extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"> <Link to="/today" />今日精選</Menu.Item>
        <Menu.Item key="2"><Link to="/playlist" />歌單</Menu.Item>
        <Menu.Item key="3"><Link to="/recents" />最近播放</Menu.Item>
        <Menu.Item key="4"><Link to="/setting" />設定</Menu.Item>
      </Menu>
    )
  }
}
