import React, { Component } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './mylist.css'
import KKBoxList from './kkbox_list'
import SpotifyList from './SpotifyList'
import Axios from 'axios'
import { spotify_icon, kkbox_icon } from '../../component/icon'

class Mylist extends Component {
	loginKKBox() {
		Axios.post('/post/loggin_kkbox').then((res) => {
			window.location.href = res.data
		})
	}

	loginSpotify() {
		Axios.post('/post/loggin_spotify').then((res) => {
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
				<div className='login_button'>
					{isSpLogin == true && isKkLogin === true ? (
						<div id='kkbox_login'>
							<img className='button_icon' src={kkbox_icon} />
							<Button circular size='big' onClick={() => this.loginKKBox()} style={kkData.data != undefined ? { display: 'none' } : {}} primary disabled={!!this.props.mylist.my_info}>
								<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登入 ＫＫＢＯＸ</a>
							</Button>
						</div>
					) : null}
					{isSpLogin == true && isKkLogin === true ? (
						<div id='spotify_login'>
							<img className='button_icon' src={spotify_icon} />
							<Button circular size='big' onClick={() => this.loginSpotify()} disabled={!!this.props.mylist.my_info} secondary>
								<a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登入ＳＰＯＴＩＦＹ</a>
							</Button>
						</div>
					) : null}
				</div>
				<KKBoxList />
				<SpotifyList />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { mylist: state.mylist, spotify: state.spotify }
}

const actionCreate = {}
Mylist = connect(mapStateToProps, actionCreate)(Mylist)

export default Mylist
