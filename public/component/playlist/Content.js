import React, { Component } from 'react'
import { Button, Grid, Image, Message, Icon } from 'semantic-ui-react'
import { modify_updated_at } from '../../component/getKKboxAPI'
import { get_Video_Name } from '../../redux/playlist.redux'
import { connect } from 'react-redux'
import { search_Youtube_By_Scraping } from '../../redux/youtube.redux'
import { search_Spotify_Track_and_Put, refresh_Spotify_List, init_Put_Track } from '../../redux/spotify.redux'
import { put_Kkbox_Track ,init_Put_Kkbox} from '../../redux/mylist_redux'
import Axios from 'axios'
import { checked_icon, x_icon, sidebar_icon, play_Icon } from '../icon'


class Content extends Component {
    constructor(props) {
        super(props)
        this.handle_spotify_button = this.handle_spotify_button.bind(this)
        this.state = {
            loggin_name: '',
            bool: false,
            name: '',
            dimmer: false,
            putting_sp: false,
            putting_kk:false,

        }
    }

    handle_option_button(e) {
        e.stopPropagation();
    }

    handle_Storage(storage) {
        if (typeof (Storage) !== "undefined") { // 瀏覽器是否支援Storage
            if (localStorage.recent) { //瀏覽器是否已存Storage
                if (localStorage["recent"].search(storage.playlist_id) == -1) { //存的Storage是否已經重複
                    let s = JSON.parse(localStorage["recent"])
                    s.push(storage)
                    localStorage["recent"] = JSON.stringify(s)
                }
            }
            else {
                let s = [storage]
                localStorage["recent"] = JSON.stringify(s);
            }
        }
    }

    handle_kkbox_button(e, id) {
        // if not loggined
        e.stopPropagation()
        console.log(this.props);
        if (this.props.mylist.msg !== 'success') {
            this.setState({ dimmer: true, loggin_name: 'KKBOX' })
            document.body.style.overflow = "hidden"
            this.style = { display: 'none' }

        }else{
            //push
            this.props.put_Kkbox_Track(id)
            document.body.style.overflow = "hidden"
            this.setState({ putting_kk: true })
        }
    }

    handle_spotify_button(e, name) {
        this.setState({ bool: true })
        e.stopPropagation()
        // if not loggined
        if (this.props.spotify.msg !== 'success') {
            this.setState({ dimmer: true, loggin_name: 'Spotify' })
            document.body.style.overflow = "hidden"
            this.style = { display: 'none' }

        }
        else {
            // push track to spotify favorite list
            this.props.search_Spotify_Track_and_Put(name.album.artist.name + '|| ' + name.name)
            // undisplay Dropdown content
            document.body.style.overflow = "hidden"
            this.setState({ putting_sp: true })

        }

    }
    handle_Kkbox_Animation() {
        setTimeout(() => {
            document.body.style.overflow = "unset"
            this.setState({ putting_sp: false,putting_kk: false , bool: false })
            this.props.init_Put_Kkbox()
        }, 2000)
    }

    handle_Spotify_Animation() {
        setTimeout(() => {
            this.props.init_Put_Track()
            this.props.refresh_Spotify_List()
            document.body.style.overflow = "unset"
            this.setState({ putting_sp: false,putting_kk: false , bool: false })
        }, 2000)
    }

    handle_Loggin() {
        if (this.state.loggin_name == 'Spotify') {
            Axios.post('/post/loggin_spotify')
                .then(res => {
                    window.location.href = res.data
                })
        }
        if (this.state.loggin_name == 'KKBOX') {
            Axios.post('/post/loggin_kkbox')
                .then(res => {
                    window.location.href = res.data
                })
        }
    }

    handle_Cancle() {
        document.body.style.overflow = "unset"
        this.setState({ dimmer: false, putting_kk: false, bool: false })
        this.props.init_Put_Track()
    }

    handle_play_button(name, data) {
        this.props.get_Video_Name(name)
        this.handle_Storage({ playlist_id: data.playlist_data.id, playlist_title: data.playlist_data.title, image_url: data.playlist_data.images[0] })
        this.setState({ name: name.name })
        //prevent repeatly requrest
        if (this.state.name != name.name) {
            this.props.search_Youtube_By_Scraping({ name: name.album.artist.name + '  ' + name.name })
        }
        // TODO: fuck the tracks
    }

    shouldComponentUpdate() {
        return this.state.name !== this.props.data.playlist_data.name
    }


    render() {
        let data = this.props.data.playlist_data
        return (
            <div >
                {this.state.putting_sp ? <div>
                    <div onClick={() => this.handle_Cancle()} id='dimmer'></div>
                    <Message icon className='putting_box' size={'large'} positive={this.props.spotify.put_track_success} negative={this.props.spotify.put_track_negative}>
                        {!this.props.spotify.put_track_success && !this.props.spotify.put_track_negative ? <Icon name='circle notched' loading /> : null}
                        {this.props.spotify.put_track_success ? <Image onLoad={this.handle_Spotify_Animation()} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={checked_icon} /> : null}
                        {this.props.spotify.put_track_negative ? <Image onLoad={this.handle_Spotify_Animation()} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={x_icon} /> : null}
                        <Message.Header>{this.props.spotify.put_track_msg}</Message.Header>
                    </Message>
                </div> : null}
                    {this.state.putting_kk? <div>
                    <div onClick={() => this.handle_Cancle()} id='dimmer'></div>
                    <Message icon className='putting_box' size={'large'} positive={this.props.mylist.put_kkbox_success} negative={this.props.mylist.put_kkbox_negative}>
                        {!this.props.mylist.put_kkbox_success && !this.props.spotify.put_track_negative ? <Icon name='circle notched' loading /> : null}
                        {this.props.mylist.put_kkbox_success ? <Image onLoad={this.handle_Kkbox_Animation()} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={checked_icon} /> : null}
                        {this.props.mylist.put_kkbox_negative ? <Image onLoad={this.handle_Kkbox_Animation()} style={{ margin: '0', height: '50px', paddingRight: '15px' }} src={x_icon} /> : null}
                        <Message.Header>{this.props.mylist.put_kkbox_msg}</Message.Header>
                    </Message>
                </div> : null
                    
                }
                {this.state.dimmer ? <div onClick={() => this.handle_Cancle()} id='dimmer'></div> : null}
                {this.state.dimmer ? <div className="loggin_box">
                    <div className='button_box'>
                        <h2>要登入{this.state.loggin_name}嗎？</h2>
                        <Button className='login_button' onClick={() => this.handle_Loggin()} primary>登入去</Button>
                        <Button className='login_button' onClick={(e) => this.handle_Cancle(e)} secondary>取消</Button>
                    </div>
                </div> : null}

                <Grid stackable={true} textAlign={"left"}>
                    <Grid.Column widescreen={7}>
                        <h1>{data.title}</h1>
                        <Button className='play' fluid onClick={() => this.handle_play_button(this.props.data.playlist_data.tracks.data[0], this.props.data)}>開始播放</Button>
                        <Grid>
                            <Grid.Column width={16}>
                                <Image src={data.images[2].url} />
                                <div className='playlist_text_box'>
                                    <div className='list_description'>
                                        <pre>{data.description}</pre>
                                    </div>
                                    <div className="list_text">
                                        <a className="list_owner link" href={data.owner.url}><p>作者：{data.owner.name}</p></a>
                                        <p>更新：{modify_updated_at(data.updated_at)}</p>
                                    </div>

                                </div>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>


                    <Grid.Column widescreen={9}>
                        <div className='list_box' >
                            {data.tracks.data.length > 0 ? data.tracks.data.map(data => {
                                return <div key={data.id} className="track">
                                    <Grid.Row>
                                        <Button className='play_button' fluid onClick={() => this.handle_play_button(data, this.props.data)}>
                                            <Grid.Column width={3}>
                                                {this.state.name == data.name ? <Image className='play_Icon' src={play_Icon}></Image> : null}
                                                <Image className='playlist_img' src={data.album.images[0].url}></Image>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                                <div className='playlist_info'>
                                                    <h3>{data.name}</h3>
                                                    <p>{data.album.artist.name}</p>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <div className="sidebar">
                                                    <div className="dropdown" style={this.state.bool ? { Float: 'left', display: 'none' } : { Float: 'left' }}>
                                                        <Image className='sidebar_icon' src={sidebar_icon} onClick={(e) => this.handle_option_button(e, data)}></Image>
                                                        <div style={this.state.bool ? { display: 'none' } : null} className="dropdown-content">
                                                            <a onClick={e => this.handle_spotify_button(e, data)}>匯入SPOTIFY歌單</a>
                                                            <a onClick={e => this.handle_kkbox_button(e, data.id)}>匯入KKBOX歌單</a>
                                                            <a onClick={e => { e.stopPropagation() }} href={data.url}>在KKBOX上播放</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid.Column>
                                        </Button>
                                    </Grid.Row>
                                </div>
                            }) : null}
                            <div style={{ marginTop: '200px' }}></div>
                        </div>


                    </Grid.Column>

                </Grid>

            </div>
        )
    }
}
const mapStatetoProps = state => {
    return { data: state.playlist, youtube: state.youtube, mylist: state.mylist, spotify: state.spotify }
}
const actionCreate = { get_Video_Name, search_Youtube_By_Scraping, refresh_Spotify_List, search_Spotify_Track_and_Put, init_Put_Track, put_Kkbox_Track,init_Put_Kkbox }
Content = connect(mapStatetoProps, actionCreate)(Content)

export default Content