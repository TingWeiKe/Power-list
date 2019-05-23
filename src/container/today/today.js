import React, { Component } from 'react'
import Box from '../../component/box/box'
import { get_Featured_Playlists_Api, handleInitState } from '../../redux/box.redux'
import { connect } from 'react-redux'
import RefreshButton from '../../component/RefreshButton'

class Today extends Component {

	handleRefresh() {
		this.props.handleInitState()
		this.handleGetTodayData()
	}

	handleGetTodayData() {
		const url = 'https://api.kkbox.com/v1.1/featured-playlists?territory=' + this.props.setting.language
		this.props.box.box_data.hasOwnProperty('data') ? null : this.props.get_Featured_Playlists_Api(url)
	}

	componentDidMount() {
		this.handleGetTodayData()
	}

	render() {
		const box = this.props.box
		const box_data = this.props.box.box_data
		const isError = box.msg === '伺服器錯誤'
		return (
			<div className='container_header'>
				<h1>{box.title}</h1>
				<Box msg={box.msg} data={box_data.data} title={box.title} bool={box.bool} />
				<RefreshButton onClick={() => this.handleRefresh()} className='refresh_button' show={isError} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { box: state.box, setting: state.setting }
}

const actionCreate = { get_Featured_Playlists_Api, handleInitState }
Today = connect(mapStateToProps, actionCreate)(Today)

export default Today
