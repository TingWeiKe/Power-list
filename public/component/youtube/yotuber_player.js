import React, { Component } from 'react'
import './yotuber_player.css'
import { Grid, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Yotuber_player extends Component {
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
        console.log(this.props.data);
        let id = this.props.data.youtube_video.length > 0 ? this.props.data.youtube_video[0].id.videoId : this.props.data.youtube_url_id
        let title = this.props.data.youtube_video.length > 0 ?this.props.data.youtube_video[0].snippet.title : this.props.data.youtube_url_title
     
        
        return (
            <Grid id='ytplayer'>
                <Grid.Row>
                    <Grid.Column style={{ padding: '0px' }} width={3}>
                        <div id='player' className={'movie_box'}>
                            {id ? <iframe onKeyDown={(e) => this.handleKeyDown(e)} className={this.state.toggle == true ? 'full_screen' : "movie"} frameBorder="0" type="text/html" width="600" height="340"
                                allow="accelerometer;encrypted-media;  autoplay;gyroscope; picture-in-picture"
                                src={"https://www.youtube.com/embed/" + id + "?autoplay=1&disablekb=1&enablejsapi=1"}
                                allowFullScreen>
                            </iframe> : null}
                            <div className='player_title'>{id  ? title : '尚未播放'}</div>
                            <Button style={{ zIndex: '2' }} onClick={() => this.handle_Toggle()} inverted size='mini' className='player-toggle-button'>放大畫面</Button>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


const mapStatetoProps = state => {return { data: state.youtube }}
const actionCreate = {}
Yotuber_player = connect(mapStatetoProps, actionCreate)(Yotuber_player)
export default Yotuber_player