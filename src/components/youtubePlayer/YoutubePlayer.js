import React, { Component } from 'react'
import './yotuber_player.css'
import { Image, Button } from 'semantic-ui-react'
import { grey_icon, pause_icon } from '../../utils/icon'
import { connect } from 'react-redux'

class YoutubePlayer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: false,
		}
	}
	handle_Toggle() {
		this.setState({ toggle: !this.state.toggle })
	}

	componentDidMount() {
		//監聽Esc
		window.addEventListener('keydown', () => {
			if (event.keyCode === 27) {
				this.setState({ toggle: false })
			}
		})
	}

	render() {
		let id = this.props.data.youtube_video.length > 0 ? this.props.data.youtube_video[0].id.videoId : this.props.data.youtube_url_id
		let title = this.props.data.youtube_video.length > 0 ? this.props.data.youtube_video[0].snippet.title : this.props.data.youtube_url_title
		return (
			<div id='ytplayer'>
				{id ? <iframe id='player' onKeyDown={(e) => this.handleKeyDown(e)} className={this.state.toggle == true ? 'full_screen' : 'movie'} frameBorder='0' type='text/html' width='600' height='340' allow='accelerometer;encrypted-media;  autoplay; picture-in-picture' src={'https://www.youtube.com/embed/' + id + '?autoplay=1&enablejsapi=1&playsinline=1'} allowFullScreen='1' /> : null}
				{/* <div className={this.state.toggle == true ? 'full_screen' : "movie"}  id='player'></div> */}
				<div className='player_title'>{id ? title : '尚未播放'}</div>
				<Button id='button' style={{ zIndex: '2' }} onClick={() => this.handle_Toggle()} inverted size='mini' className='player-toggle-button'>
					放大畫面
				</Button>
				<Image src={grey_icon} id='play_button' />
				<Image src={pause_icon} id='pause_button' />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { data: state.youtube }
}
const actionCreate = {}
YoutubePlayer = connect(mapStateToProps, actionCreate)(YoutubePlayer)
export default YoutubePlayer
