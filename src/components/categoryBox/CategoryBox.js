import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoryBoxApi, handleInitState } from '../../redux/categoryBox.redux'
import { withRouter } from 'react-router-dom'

import Box from '../box/box'

class CategoryBox extends Component {
	componentDidMount() {
		this.props.handleInitState()
		const url = 'https://api.kkbox.com/v1.1/featured-playlist-categories/' + this.props.location.pathname.split('/')[2] + '?territory=' + localStorage.getItem('language')
		this.props.getCategoryBoxApi(url)
	}

	render() {
		console.log('Q')
		const categoryBox = this.props.data.categoryBox
		const data = this.props.data.categoryBox.categoryBox_data
		return (
			<div className='container_header'>
				<Box data={data.hasOwnProperty('playlists') ? data.playlists.data : null} title={data.title} bool={categoryBox.bool} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { data: state }
}

const actionCreate = { getCategoryBoxApi, handleInitState }
CategoryBox = connect(mapStateToProps, actionCreate)(CategoryBox)

export default withRouter(CategoryBox)
