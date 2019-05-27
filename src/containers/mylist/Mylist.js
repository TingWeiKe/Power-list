import React, { Component } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './mylist.scss'
import KKBoxList from '../kkboxList/KKBoxList'
import SpotifyList from '../spotifyList/SpotifyList'
import axios from 'axios'
import { spotify_icon, kkbox_icon } from '../../utils/icon'

class Mylist extends Component {
	loginKKBox() {
		axios.post('/post/loggin_kkbox').then(res => {
			window.location.href = res.data
		})
	}

	loginSpotify() {
		axios.post('/post/loggin_spotify').then(res => {
			window.location.href = res.data
		})
	}

	render() {
		const isKkLogin = this.props.mylist.bool
		const isSpLogin = this.props.spotify.bool
		const spData = this.props.spotify.data ? this.props.spotify.data : null
		const kkData = this.props.mylist.mylist ? this.props.mylist.mylist : null
		return (
			<div className='container_header'>
				<h1>我的歌單</h1>
				{isSpLogin == false && isKkLogin === false ? (
					<div className='login'>
						<div id='kkbox_login'>
							<img className='button_icon' src={kkbox_icon} />
							<Button circular className='login_button' size='big' onClick={this.loginKKBox} style={kkData.data != undefined ? { display: 'none' } : {}} primary content='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登入 ＫＫＢＯＸ' disabled={!!this.props.mylist.my_info} />
						</div>
						<div id='spotify_login'>
							<img className='button_icon' src={spotify_icon} />
							<Button circular className='login_button' size='big' onClick={this.loginSpotify} disabled={!!this.props.mylist.my_info} content='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登入ＳＰＯＴＩＦＹ' secondary />
						</div>
					</div>
				) : null}
				<KKBoxList />
				<SpotifyList />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { mylist: state.kkbox, spotify: state.spotify }
}

const actionCreate = {}
Mylist = connect(mapStateToProps, actionCreate)(Mylist)

export default Mylist
