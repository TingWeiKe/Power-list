import React, { Component } from 'react'
import Box from '../../component/box/box'
import { get_Featured_Playlists_Api, handle_Init_State } from '../../redux/box.redux'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Today extends Component {

  handleGetTodayData() {
    const url = 'https://api.kkbox.com/v1.1/featured-playlists?territory=' + this.props.data.setting.language
		this.props.handle_Init_State()
		this.props.data.box.box_data.hasOwnProperty('data') ? null : this.props.get_Featured_Playlists_Api(url)
  }
  
	componentDidMount() {
    this.handleGetTodayData()
	}

	

	render() {
		return (
			<div>
				<Box msg={this.props.data.box.msg} data={this.props.data.box.box_data.data} title={this.props.data.box.title} bool={this.props.data.box.bool} />
				<div className='refresh_button' style={!this.props.data.box.box_data.data && this.props.data.box.msg === '伺服器錯誤' ? { display: 'block' } : null}>
					<Button onClick={() => this.handleGetTodayData()} primary size='big'>
						重新整理
					</Button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { data: state }
}
const actionCreate = { get_Featured_Playlists_Api, handle_Init_State }
Today = connect(mapStateToProps, actionCreate)(Today)

export default Today
