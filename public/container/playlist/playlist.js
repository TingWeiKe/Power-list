import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_Playlists_Id_Api, hadndle_Init_State} from '../../redux/playlist.redux'
import { Button, Loader } from 'semantic-ui-react'

import Content from './Content'
import './playlist.css'


class Playlist extends Component {


  componentDidMount() {
    let playlist_id = this.props.location.pathname.replace('/playlist/', '')
    let url = 'https://api.kkbox.com/v1.1/featured-playlists/' + playlist_id + '?territory=' +this.props.data.setting.language
    this.props.get_Playlists_Id_Api(url)
  }
  componentWillUnmount() {
    this.props.hadndle_Init_State()
  }
  render() {
    let res = this.props.data.playlist.playlist_data
    const bool = this.props.data.playlist.bool;
    return (
      <div className='header'>
        <Button className='back' onClick={this.props.history.goBack}>
          <span herf='#'> 返回 </span>
        </Button>
        <Loader active={bool} inline='centered' size='huge' />
        {Object.keys(res).length ? <Content data={res}></Content> : null}
      </div>

    )

  }
}

const mapStatetoProps = state => {
  return { data: state }
}
const actionCreate = { get_Playlists_Id_Api, hadndle_Init_State }
Playlist = connect(mapStatetoProps, actionCreate)(Playlist)

export default withRouter(Playlist)

