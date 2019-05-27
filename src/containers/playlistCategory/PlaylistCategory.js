import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import { getPlaylistCategoryApi, handleInitState } from '../../redux/playlistCategory.redux'
import { getHotBoardApi } from '../../redux/hotBoard.redux'
import { getCategoryApi } from '../../redux/category.redux'
import { connect } from 'react-redux'
import './playlistCategory.scss'
import Feature from '../../components/feature/feature'
import HotBoard from '../../components/hotBoard/HotBoard'
import Category from '../../components/category/category'
import { getKKoxAccessToken, doCookieSetup } from '../../utils/kkboxAPI'
import RefreshButton from '../../components/RefreshButton'

class PlaylistCategory extends Component {
	getData() {
		const language = this.props.data.setting.language
		const featureUrl = 'https://api.kkbox.com/v1.1/new-hits-playlists?territory=' + language
		const hotBoardUrl = 'https://api.kkbox.com/v1.1/charts?territory=' + language
		const categoryUrl = 'https://api.kkbox.com//v1.1/featured-playlist-categories?territory=' + language
		this.props.getPlaylistCategoryApi(featureUrl)
		this.props.getHotBoardApi(hotBoardUrl)
		this.props.getCategoryApi(categoryUrl)
	}

	componentDidMount() {
		this.props.data.playlistCategory.playlistCategory_data.hasOwnProperty('data') && this.props.data.hot_board.hot_board_data.hasOwnProperty('data') ? null : this.getData()
	}

	handleRefresh() {
		this.props.handleInitState()
		getKKoxAccessToken().then(res => {
			if (res.access_token !== undefined) {
				doCookieSetup('token', res.access_token, res.expires_in)
			}
			this.getData()
		})
	}
	render() {
		console.log(this.props)
		const bool1 = this.props.data.playlistCategory.bool
		const bool2 = this.props.data.category.bool
		const hb_msg = this.props.data.hot_board.msg
		const pc_msg = this.props.data.playlistCategory.msg
		const isShow = hb_msg && pc_msg === '伺服器錯誤'
		return (
			<div className='container_header'>
				<h1>歌單</h1>
				<RefreshButton onClick={() => this.handleRefresh()} show={isShow} />
				<Loader content='載入中...' className='loader' active={bool1 == true && pc_msg !== '伺服器錯誤'} inline='centered' size='huge' />
				{bool1 && bool2 && this.props.data.playlistCategory.hot_board == true ? null : (
					<div style={bool1 && bool2 && this.props.data.playlistCategory.hot_board == true ? { display: 'none' } : { display: 'block' }}>
						{hb_msg && pc_msg !== '伺服器錯誤' ? <h2 className='subheader'>最新主打</h2> : null}
						<Feature data={this.props.data.playlistCategory.playlistCategory_data.data} />
						{hb_msg && pc_msg !== '伺服器錯誤' ? <h2 className='subheader'>排行榜</h2> : null}
						<HotBoard data={this.props.data.hot_board.hot_board_data.data} />
						{hb_msg && pc_msg !== '伺服器錯誤' ? <h2 className='subheader'>歌單分類</h2> : null}
						<Category data={this.props.data.category.category_data.data} language={this.props.data.setting.language} />
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { data: state }
}
const actionCreate = { getPlaylistCategoryApi, getHotBoardApi, getCategoryApi, handleInitState }
PlaylistCategory = connect(mapStateToProps, actionCreate)(PlaylistCategory)

export default PlaylistCategory
