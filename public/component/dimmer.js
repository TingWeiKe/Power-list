import React, { PureComponent } from 'react'
import { Button, Grid, Image, Message, Icon } from 'semantic-ui-react'
import { checked_icon, x_icon, sidebar_icon, play_Icon } from './icon'
import { connect } from 'react-redux'
import { init_Put_Track, refresh_Spotify_List } from '../redux/spotify.redux'
import { init_Put_Kkbox } from '../redux/mylist_redux'


class Dimmer extends React.Component {
   


    handle_Cancle() {
        document.body.style.overflow = "unset"
        this.setState({ dimmer: false, putting_sp: false, bool: false })
    }


    handle_Animation(name) {
        console.log(name);
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
                this.props.refresh_Spotify_List()
                document.body.style.overflow = "unset"
                this.props.init_State()
            }, 2000)
        }
    }


    render() {
        return (
            <div>
                <div onClick={() => this.handle_Cancle()} id='dimmer'></div>
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
const mapStatetoProps = state => {
    return {}
}
const actionCreate = { init_Put_Track, refresh_Spotify_List, init_Put_Kkbox }
Dimmer = connect(mapStatetoProps, actionCreate)(Dimmer)

export default Dimmer