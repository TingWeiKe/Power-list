import React from 'react'
import { Image, Message, Icon } from 'semantic-ui-react'
import { checked_icon, x_icon } from '../../utils/icon'
import { connect } from 'react-redux'
import { init_Put_Track, refreshSpotifyList } from '../../redux/spotify.redux'
import { initPutKKBox } from '../../redux/kkbox.redux'
import './dimmer.scss'

class Dimmer extends React.Component {
	handleCancel() {
		document.body.style.overflow = 'unset'
		this.props.init_State()
		this.props.init_Put_Track()
		this.props.initPutKKBox()
	}

	handleAnimation(name) {
		if (name === 'kkbox') {
			setTimeout(() => {
				document.body.style.overflow = 'unset'
				this.props.initPutKKBox()
				this.props.initState()
			}, 2000)
		}
		if (name === 'spotify') {
			setTimeout(() => {
				this.props.init_Put_Track()
				this.props.refreshSpotifyList()
				document.body.style.overflow = 'unset'
				this.props.initState()
			}, 2000)
		}
	}

	render() {
		return (
			<div style={this.props.isShow ? { display: 'block' } : { display: 'none' }}>
				<div onClick={() => this.handleCancel()} id='dimmer' />
				<Message icon className='putting_box' size={'large'} positive={this.props.put_track_success} negative={this.props.put_track_negative}>
					{!this.props.put_track_success && !this.props.put_track_negative ? <Icon name='circle notched' loading /> : null}
					{this.props.put_track_success ? <Image className='putting_icon' onLoad={this.handleAnimation(this.props.name)} src={checked_icon} /> : null}
					{this.props.put_track_negative ? <Image className='putting_icon' onLoad={this.handleAnimation(this.props.name)} src={x_icon} /> : null}
					<Message.Header>{this.props.put_track_msg}</Message.Header>
				</Message>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {}
}
const actionCreate = { init_Put_Track, refreshSpotifyList, initPutKKBox }
Dimmer = connect(mapStateToProps, actionCreate)(Dimmer)

export default Dimmer
