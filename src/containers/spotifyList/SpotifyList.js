import React, { Component } from 'react'
import { getUserSpotifyList, getSpotifyNext, refreshSpotifyList, putSpotifyTrack } from '../../redux/spotify.redux'
import { getUrlVars } from '../../utils/kkboxAPI'
import { music_icon } from './music_icon'
import { Grid, Image, Loader, Button } from 'semantic-ui-react'
import { play_Icon } from '../../utils/icon'
import { connect } from 'react-redux'
import { scrapeYoutubeData } from '../../redux/youtube.redux'
import InfiniteScroll from 'react-infinite-scroller'
import Dimmer from '../../components/dimmer/Dimmer'
import './spotifyList.scss'

class SpotifyList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			putting_sp: false
		}
	}

	componentDidMount() {
		const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=40&market=TW'
		if (getUrlVars() && getUrlVars().length > 150) {
			this.props.getUserSpotifyList(url)
		}
		setTimeout(() => {
			if (localStorage.getItem('track_name')) {
				this.setState({ putting_sp: true })
				this.props.putSpotifyTrack(localStorage.getItem('track_name'))
			}
		}, 1000)
	}

	handle_play_button(data) {
		this.setState({ id: data.id })
		// //prevent repeatly requrest
		if (this.state.id != data.id) {
			this.props.scrapeYoutubeData({ name: data.artists[0].name + '  ' + data.name })
		}
	}

	parseDurationMs(i) {
		let m = Math.floor(i / 60000)
		let s = ((i % 60000) / 1000).toFixed(0)
		return m + ':' + (s < 10 ? '0' : '') + s
	}

	handleRefresh() {
		this.props.refreshSpotifyList()
	}

	init_State = () => {
		this.setState({ putting_sp: false })
		localStorage.removeItem('track_name')
	}

	render() {
		const spData = this.props.data
		return (
			<div>
				<Dimmer isShow={this.state.putting_sp} init_State={this.init_State} put_track_success={spData.put_track_success} put_track_negative={spData.put_track_negative} put_track_msg={spData.put_track_msg} name={'spotify'} />
				{spData.msg == 'success' ? (
					<Grid style={{ zIndex: '99' }}>
						<div id='spotify' />
						<Grid.Column className='sp_column' widescreen={16}>
							<Button size='large' style={{ margin: '10px' }} onClick={this.handleRefresh} secondary content='重新整理' />
							{spData.data.items.map(data => {
								return (
									<div className='spotify_box' key={data.track.id}>
										<Grid.Row>
											<div className='sp_track_box' onClick={() => this.handle_play_button(data.track)}>
												<Image className='sp_play_Icon' src={this.state.id == data.track.id ? play_Icon : music_icon} />
												<Image circular className='sp_img' src={data.track.album.images[2].url} />
												<div className='sp_title_box'>
													<h3 className={this.state.id == data.track.id ? 'green' : null}>{data.track.name}</h3>
													<p>{data.track.album.artists[0].name + ' \f | \f ' + data.track.album.name}</p>
													<p className={this.state.id == data.track.id ? 'green duration_ms' : 'duration_ms'}>{this.parseDurationMs(data.track.duration_ms)}</p>
												</div>
											</div>
										</Grid.Row>
									</div>
								)
							})}
							<InfiniteScroll pageStart={0} loadMore={() => this.props.getSpotifyNext(spData.data.next)} hasMore={true} loader={<Loader key='loader' style={{ color: 'white' }} active={!!spData.data.next} content='載入中...' inline={'centered'} size='large' />} />
						</Grid.Column>
					</Grid>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { data: state.spotify }
}
const actionCreate = { getUserSpotifyList, scrapeYoutubeData, getSpotifyNext, refreshSpotifyList, putSpotifyTrack }
SpotifyList = connect(mapStateToProps, actionCreate)(SpotifyList)

export default SpotifyList
