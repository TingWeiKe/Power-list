import React, { Component } from 'react'
import { Button, Grid, Image, Dimmer } from 'semantic-ui-react'
import { modify_updated_at } from '../../component/getKKboxAPI'
import Sidebar from './sidebar'
import { play_Icon } from './playlist.img'

import { get_Video_Name } from '../../redux/playlist.redux'
import { connect } from 'react-redux'
import { searchYoutubeByUrl } from '../../redux/youtube.redux'
const url = "https://account.kkbox.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fmylist&client_id=b89dc89b34b7f4d2759580c9b53141ae&response_type=code&state=1111"


class Content extends Component {
    constructor(props) {
        super(props)
        this.handle_mylist_button = this.handle_mylist_button.bind(this)
        this.state = {
            name: '',
            dimmer: false
        }
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
    handle_mylist_button(e) {
        console.log(this.props);
        
        e.stopPropagation()
        if(this.props.data.msg!=='succdess')
        {document.body.style.overflow = "hidden"
        this.setState({ dimmer: true })
       }else{
        console.log('QQ');
       }

    }

    handle_Loggin() {

        
        location.href = url
    }

    handle_Cancle() {
        document.body.style.overflow = "unset"
        this.setState({ dimmer: false })
    }

    handle_play_button(name, data) {
        this.props.get_Video_Name(name)
        this.handle_Storage({ playlist_id: data.playlist_data.id, playlist_title: data.playlist_data.title, image_url: data.playlist_data.images[0] })
        this.setState({ name: name.name })
        this.props.searchYoutubeByUrl({ name: name.album.artist.name + '  ' + name.name })
    }


    shouldComponentUpdate() {
        return this.state.name !== this.props.data.playlist_data.name
    }


    render() {
        let data = this.props.data.playlist_data
        return (
            <div>
                {this.state.dimmer ? <div id='dimmer'></div> : null}
                {this.state.dimmer ? <div className="loggin_box">
                    <div className='button_box'>
                        <h2>要登入KKBOX嗎？</h2>
                        <Button className='login_button' onClick={() => this.handle_Loggin()} primary>登入KKBOX</Button>
                        <Button className='login_button' onClick={(e) => this.handle_Cancle(e)} secondary>取消</Button>
                    </div>
                </div> : null}

                <Grid stackable={true} textAlign={"left"}>
                    <Grid.Column widescreen={8}>
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
                                        <a className="list_owner" href={data.owner.url}><p>作者：{data.owner.name}</p></a>
                                        <p>更新：{modify_updated_at(data.updated_at)}</p>
                                    </div>

                                </div>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>


                    <Grid.Column widescreen={8}>
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
                                                <h4>{data.name}</h4>
                                                <p>{data.album.artist.name}</p>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <Sidebar id={data.id} tracks_url={data.url} handle_mylist_button={this.handle_mylist_button}></Sidebar>
                                        </Grid.Column>
                                    </Button>
                                </Grid.Row>
                            </div>
                        }) : null}
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}
const mapStatetoProps = state => {
    return { data: state.playlist, youtube: state.youtube }
}
const actionCreate = { get_Video_Name, searchYoutubeByUrl }
Content = connect(mapStatetoProps, actionCreate)(Content)

export default Content