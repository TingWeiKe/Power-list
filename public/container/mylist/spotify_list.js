import React, { Component } from 'react'
import { get_Spotify_API } from '../../redux/spotify.redux'
import { getUrlVars } from '../../component/getKKboxAPI'
import './spotify_list.css'
import {music_icon} from './music_icon'
import {  Grid, Image } from 'semantic-ui-react'
import { play_Icon } from '../../component/playlist/playlist.img'
import { connect } from 'react-redux'
import { searchYoutubeByUrl } from '../../redux/youtube.redux'


class spotify_list extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }
    componentDidMount() {
        if (getUrlVars()) {
            this.props.get_Spotify_API()
        }

    }
    handle_play_button(data) {
        this.setState({ id: data.id })

        // //prevent repeatly requrest
        if (this.state.id != data.id) {
            this.props.searchYoutubeByUrl({ name: data.artists[0].name + '  ' + data.name })
        }

    }
    parse_Duration_ms(i){
        let m  = Math.floor(i / 60000);
        let s = ((i % 60000) / 1000).toFixed(0);
        return m + ":" + (s < 10 ? '0' : '') + s;
    }


    render() {
        let data = this.props.data.data ? this.props.data.data.items : null

        return (
            <div>
              {data ?  <Grid style={{ zIndex: '99' }}>
                    {/* {data ? <div id='spotify'></div> : null} */}
                    <Grid.Column widescreen={16}>
                        {data ? data.map(data => {
                            return <div className='spotify_box' key={data.track.id} >
                                <Grid.Row>
                                     <div className='sp_track_box' onClick={() => this.handle_play_button(data.track)}>
                                     <Image className='sp_play_Icon' src={ this.state.id == data.track.id ?    play_Icon :music_icon}></Image>
                                        <Image circular className='sp_img' src={data.track.album.images[2].url}></Image>
                                        <div className='sp_title_box'>
                                            <h3 className={this.state.id == data.track.id ? 'green':null}>{data.track.name}</h3>
                                            <p>{data.track.album.artists[0].name+' \f | \f '+data.track.album.name}</p>
                                            <p className={this.state.id == data.track.id ? 'green duration_ms':'duration_ms'}>{ this.parse_Duration_ms(data.track.duration_ms)}</p>
                                        </div>
                                   
                                        {/* <Sidebar id={data.track.id} tracks_url={data.url} handle_mylist_button={this.handle_mylist_button}></Sidebar> */}

                                    </div>
                                </Grid.Row>
                            </div>
                        }) : null}
                        <div style={{ paddingTop: '300px' }}></div>
                    </Grid.Column>
                </Grid>: null}
            </div>
        )
    }
}

const mapStatetoProps = state => { return { data: state.spotify } }
const actionCreate = { get_Spotify_API, searchYoutubeByUrl }
spotify_list = connect(mapStatetoProps, actionCreate)(spotify_list)


export default spotify_list