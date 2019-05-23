import React, { Component } from 'react'
import { get_Spotify_API, get_Spotify_Next, refresh_Spotify_List , search_Spotify_Track_and_Put} from '../../redux/spotify.redux'
import { getUrlVars } from '../../component/getKKboxAPI'
import './spotify_list.css'
import { music_icon } from './music_icon'
import { Grid, Image, Loader, Button } from 'semantic-ui-react'
import { play_Icon } from '../../component/icon'
import { connect } from 'react-redux'
import { search_Youtube_By_Scraping } from '../../redux/youtube.redux'
import InfiniteScroll from 'react-infinite-scroller';
import Dimmer from '../../component/dimmer'
class spotify_list extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            putting_sp:false
        }
    }


    componentDidMount() {
        const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=40&market=TW'
        if (getUrlVars() && getUrlVars().length > 150) {
            this.props.get_Spotify_API(url)
        }
        setTimeout(()=>{
            if(localStorage.getItem('track_name')){
                this.setState({ putting_sp: true })
                this.props.search_Spotify_Track_and_Put(localStorage.getItem('track_name'))
            }
        },1500)
    }


    handle_play_button(data) {
        this.setState({ id: data.id })
        // //prevent repeatly requrest
        if (this.state.id != data.id) {
            this.props.search_Youtube_By_Scraping({ name: data.artists[0].name + '  ' + data.name })
        }
    }


    parse_Duration_ms(i) {
        let m = Math.floor(i / 60000);
        let s = ((i % 60000) / 1000).toFixed(0);
        return m + ":" + (s < 10 ? '0' : '') + s;
    }


    hanlde_Refresh() {
        this.props.refresh_Spotify_List()
    }


    init_State = () => {
        this.setState({ putting_sp: false })
        localStorage.removeItem('track_name')
    }


    render() {
        let data = this.props.data.data ? this.props.data.data.items : null
        return (
            <div>
                {this.state.putting_sp ?
                    <Dimmer
                        init_State={this.init_State}
                        put_track_success={this.props.data.put_track_success}
                        put_track_negative={this.props.data.put_track_negative}
                        put_track_msg={this.props.data.put_track_msg}
                        name={'spotify'}>
                    </Dimmer> : null}

                {this.props.data.msg == 'success' ?
                    <Grid style={{ zIndex: '99' }}>
                        <div id='spotify'></div>
                        {/* {data ? <div id='spotify'></div> : null} */}
                        <Grid.Column className='sp_column' widescreen={16}>
                            <Button size='large' style={{ margin: '10px' }} onClick={() => this.hanlde_Refresh()} secondary>重新整理</Button>
                            {data ? data.map(data => {
                                return <div className='spotify_box' key={data.track.id} >
                                    <Grid.Row>
                                        <div className='sp_track_box' onClick={() => this.handle_play_button(data.track)}>
                                            <Image className='sp_play_Icon' src={this.state.id == data.track.id ? play_Icon : music_icon}></Image>
                                            <Image circular className='sp_img' src={data.track.album.images[2].url}></Image>
                                            <div className='sp_title_box'>
                                                <h3 className={this.state.id == data.track.id ? 'green' : null}>{data.track.name}</h3>
                                                <p>{data.track.album.artists[0].name + ' \f | \f ' + data.track.album.name}</p>
                                                <p className={this.state.id == data.track.id ? 'green duration_ms' : 'duration_ms'}>{this.parse_Duration_ms(data.track.duration_ms)}</p>
                                            </div>

                                            {/* <Sidebar id={data.track.id} tracks_url={data.url} handle_mylist_button={this.handle_mylist_button}></Sidebar> */}

                                        </div>
                                    </Grid.Row>
                                </div>
                            }) : null}
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => this.props.get_Spotify_Next(this.props.data.data.next)}
                                hasMore={true}
                                loader={<Loader key='loader' style={{ color: 'white' }} active={!!this.props.data.data.next} content='載入中...' inline={'centered'} size='large' />}
                            >
                                {null}
                            </InfiniteScroll>
                            <div style={{ paddingTop: '200px' }}></div>

                        </Grid.Column>
                    </Grid> : null}
            </div>
        )
    }
}

const mapStateToProps = state => { return { data: state.spotify } }
const actionCreate = { get_Spotify_API, search_Youtube_By_Scraping, get_Spotify_Next, refresh_Spotify_List, search_Spotify_Track_and_Put }
spotify_list = connect(mapStateToProps, actionCreate)(spotify_list)


export default spotify_list