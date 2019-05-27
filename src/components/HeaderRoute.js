import React, { Component } from 'react'
import { Link,  withRouter, } from 'react-router-dom'
import Language_form from '../containers/setting/language_form'
import { Menu } from 'semantic-ui-react'

class HeaderRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: this.props.location.pathname
    }
  }
  componentWillMount(){

    localStorage.getItem('language')==null? localStorage.setItem('language','TW'):null

    //Route
    const publicList = ['/today', '/playlistCategory','/recents','/search','/mylist','/post']
    const pathName = this.props.location.pathname
    if (publicList.indexOf(pathName) === -1 ) {
      if(pathName.indexOf('/playlist/') === -1){
        this.setState({ activeItem: '/today' })
        return this.props.history.push('/today')
      }
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    console.log(this.props)
    return (
      <div>
        <Menu color="blue" className='menu' style={{ position: 'fixed', top: '0px', width: '100vw', zIndex: '99', Bottom: '200px' ,fontSize:'15px'}}  borderless={true} >
   
          <Menu.Item
            as={Link}
            style={{padding:'0px 7px'}} 
            name='/today'
            active={activeItem === '/today'}
            onClick={this.handleItemClick}
            to={{ pathname: '/today', search: this.props.location.search }}
          >
            今日精選
        </Menu.Item>

          <Menu.Item
            as={Link}
            style={{padding:'0px 7px'}} 
            name='/playlistCategory'
            active={activeItem === '/playlistCategory'}
            onClick={this.handleItemClick}
            to={{ pathname: '/playlistCategory', search: this.props.location.search }}
          >
            歌單
        </Menu.Item>

          <Menu.Item
            as={Link}
            style={{padding:'0px 7px'}} 
            name='/recents'
            active={activeItem === '/recents'}
            onClick={this.handleItemClick}
            key={''}
            to={{ pathname: '/recents', search: this.props.location.search }}
          >
            最近播放
        </Menu.Item>
        <Menu.Item
            as={Link}
            style={{padding:'0px 7px'}} 
            name='/search'
            active={activeItem === '/search'}
            onClick={this.handleItemClick}
            to={{ pathname: '/search', search: this.props.location.search }}
          >
          搜尋
        </Menu.Item>
          
          <Menu.Item
            as={Link}
            style={{padding:'0px 7px'}} 
            name='/mylist'
            active={activeItem === '/mylist'}
            onClick={this.handleItemClick}
            to={{ pathname: '/mylist', search: this.props.location.search }}
          >
            我的歌單
        </Menu.Item>
        <Language_form></Language_form>
        </Menu>
      </div>
    )
  }
}
export default withRouter(HeaderRoute)