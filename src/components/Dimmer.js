import React from 'react'
import { Image, Message, Icon } from 'semantic-ui-react'
import { checked_icon, x_icon } from './icon'
import { connect } from 'react-redux'
import { init_Put_Track, refreshSpotifyList } from '../redux/spotify.redux'
import { init_Put_Kkbox } from '../redux/kkbox_redux'


class Dimmer extends React.Component {
    handleCancel() {
        document.body.style.overflow = "unset"
        this.props.init_State()
        this.props.init_Put_Track()
        this.props.init_Put_Kkbox()
    }

    handle_Animation(name) {
        if (name === 'kkbox') {
            setTimeout(() => {
                document.body.style.overflow = "unset"
                this.props.init_Put_Kkbox()
                this.props.init_State()
            }, 2000)
        }
        if (name === 'spotify') {
            setTimeout(() => {
                this.props.init_Put_Track()
                this.props.refreshSpotifyList()
                document.body.style.overflow = "unset"
                this.props.init_State()
            }, 2000)
        }
    }


    render() {
        console.log(this.props.isShow)
        return (
            <div style={this.props.isShow?{display:'block'}:{display:'none'}}>
                <div onClick={() => this.handleCancel()} id='dimmer'></div>
                <Message icon className='putting_box' size={'large'} positive={this.props.put_track_success} negative={this.props.put_track_negative}>
                    {!this.props.put_track_success && !this.props.put_track_negative ? <Icon name='circle notched' loading /> : null}
                    {this.props.put_track_success ? <Image onLoad={this.handle_Animation(this.props.name)} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={checked_icon} /> : null}
                    {this.props.put_track_negative ? <Image onLoad={this.handle_Animation(this.props.name)} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={x_icon} /> : null}
                    <Message.Header>{this.props.put_track_msg}</Message.Header>
                </Message>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {}
}
const actionCreate = { init_Put_Track, refreshSpotifyList, init_Put_Kkbox }
Dimmer = connect(mapStateToProps, actionCreate)(Dimmer)

export default Dimmer