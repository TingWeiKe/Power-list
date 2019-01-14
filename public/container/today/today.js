import React, { Component } from 'react'
import Box from '../../component/box/box'
import { get_Featured_Playlists_Api, handle_Init_State } from '../../redux/box.redux'
import { connect } from 'react-redux'
class Today extends Component {

  componentDidMount() {
    let url = 'https://api.kkbox.com/v1.1/featured-playlists?territory=' + this.props.data.setting.language
    this.props.get_Featured_Playlists_Api(url)
  }

  componentWillUnmount() {
    this.props.handle_Init_State()
  }
  render() {
    return (
      <div >
        <Box data={this.props.data.box.box_data.data} title={this.props.data.box.title} bool={this.props.data.box.bool} />
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return { data: state }
}
const actionCreate = { get_Featured_Playlists_Api, handle_Init_State }
Today = connect(mapStatetoProps, actionCreate)(Today)
export default Today