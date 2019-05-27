import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPlaylistsId, handleInitState, getVideoName } from '../../redux/playlist.redux'
import { Loader } from 'semantic-ui-react'
import Content from './Content'
import { getKKoxAccessToken, doCookieSetup } from '../../utils/kkboxAPI'
import RefreshButton from '../../components/RefreshButton'
import './playlist.scss'

class Playlist extends Component {
	get_Data() {
		let playlist_id = this.props.location.pathname.replace('/playlist/', '')
		let url = 'https://api.kkbox.com/v1.1/featured-playlists/' + playlist_id + '?territory=' + this.props.data.setting.language
		this.props.getPlaylistsId(url)
	}

	componentDidMount() {
		this.props.handleInitState()
		this.get_Data()
	}

	handleRefresh() {
		this.props.handleInitState()
		getKKoxAccessToken().then(res => {
			if (res.access_token) {
				doCookieSetup('token', res.access_token, res.expires_in)
				this.get_Data()
			}
		})
	}

	render() {
		const res = this.props.data.playlist.playlist_data
		const bool = this.props.data.playlist.bool
		const isShow = this.props.data.playlist.msg === '伺服器錯誤'
		return (
			<div className='container_header'>
				<div className='back' onClick={this.props.history.goBack}>
					<span herf='#'>{'< 返回'}</span>
				</div>
				<RefreshButton onClick={() => this.handleRefresh()} show={isShow} />
				<Loader active={bool} inline='centered' content='載入中...' size='huge' />
				{Object.keys(res).length ? <Content data={res} /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { data: state }
}

const actionCreate = { getPlaylistsId, handleInitState, getVideoName }
Playlist = connect(mapStateToProps, actionCreate)(Playlist)

export default withRouter(Playlist)
