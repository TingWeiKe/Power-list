import React, { Component } from 'react'
import { play_Icon } from '../../utils/icon'
import { Button, Grid, Image, Loader } from 'semantic-ui-react'
import { getUserKKBoxList, getKKBoxNext, putKKBoxTrack } from '../../redux/kkbox.redux'
import { scrapeYoutubeData } from '../../redux/youtube.redux'
import { connect } from 'react-redux'
import { getUrlVars } from '../../utils/kkboxAPI'
import KkItem from '../../components/kkItem/KkItem'
import Dimmer from '../../components/dimmer/Dimmer'
import InfiniteScroll from 'react-infinite-scroller'
import './kkBoxList.scss'

class KKBoxList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: true,
			putting_kk: false,
			name: '',
		}
	}

	componentDidMount() {
		const url = 'https://api.kkbox.com/v1.1/me'
		console.log(getUrlVars() )
		if (getUrlVars() && getUrlVars().length > 20 && getUrlVars().length < 50) {
			this.props.getUserKKBoxList(url)
		}
		setTimeout(() => {
			if (localStorage.getItem('track_id')) {
				this.setState({ putting_kk: true })
				this.props.putKKBoxTrack(localStorage.getItem('track_id'))
			}
		}, 1500)
	}

	shouldComponentUpdate() {
		return this.props.data.mylist.data == this.props.data.mylist.data
	}

	handle_play_button(name, artist) {
		this.setState({ name: name })
		this.props.scrapeYoutubeData({ name: name + '  ' + artist })
	}

	handle_Sort() {
		this.setState({ toggle: !this.state.toggle })
		this.props.data.mylist.data.reverse()
	}

	init_State() {
		this.setState({ putting_kk: false })
		localStorage.removeItem('track_id')
	}

	render() {
		const info = this.props.data.my_info ? this.props.data.my_info : null
		const kkData = this.props.data.mylist.hasOwnProperty('data') ? this.props.data.mylist.data : null
		const isLoading = !!getUrlVars() && getUrlVars().length > 20 && getUrlVars().length < 50 && !kkData
		return (
			<>
				<Dimmer isShow={this.state.putting_kk} initState={()=>this.initState()} put_track_success={this.props.data.put_kkbox_success} put_track_negative={this.props.data.put_kkbox_negative} put_track_msg={this.props.data.put_kkbox_msg} name={'kkbox'} />
				<Loader content='載入中...' active={isLoading} inline={'centered'} size='massive' />
				{ kkData ? (
					<Grid textAlign='left' stackable>
						<Grid.Column>
							<div className='kkbox_list'>
								<Image rounded centered circular src={info.images[2].url} />
								<div className='kk_list_text'>
									<a className='kk_list_owner' href={info.url}>
										<h2>{info ? info.name : null}</h2>
									</a>
								</div>
								<Button onClick={() => this.handle_Sort()}>排序</Button>
								<h3>{this.state.toggle ? '最新 =============> 最舊' : '最舊 =============> 最新'}</h3>
								{kkData.map((data) => {
									return (
										<KkItem
											key={data.id}
											handle_play_button={() => this.handle_play_button(data.name, data.album.artist.name)}
											songName={this.state.name}
											trackName={data.name}
											artistName={data.album.artist.name}
											imgSrc={data.album.images[0].url}
											icon={play_Icon}
										/>
									)
								})}
								<InfiniteScroll
									pageStart={0}
									loadMore={() => this.props.getKKBoxNext(this.props.data.mylist.paging.next)}
									hasMore={true}
									loader={<Loader active={!!this.props.data.mylist.paging.next} content='載入中...' inline={'centered'} size='large' />}
								/>
							</div>
						</Grid.Column>
					</Grid>
				) : null}
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return { data: state.kkbox }
}

const actionCreate = { getUserKKBoxList, scrapeYoutubeData, getKKBoxNext, putKKBoxTrack }
KKBoxList = connect(mapStateToProps, actionCreate)(KKBoxList)

export default KKBoxList
