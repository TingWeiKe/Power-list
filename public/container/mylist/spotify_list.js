import React, { Component } from 'react'
import {get_Spotify_API} from '../../redux/spotify.redux'
import { getUrlVars } from '../../component/getKKboxAPI'
import './spotify_list.css'
import { Button, Grid, Image } from 'semantic-ui-react'
import { play_Icon } from '../../component/playlist/playlist.img'
import { connect } from 'react-redux'
import { searchYoutubeByUrl } from '../../redux/youtube.redux'
class spotify_list extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    componentDidMount() {
        console.log(this.props.data.data);
        
        if(getUrlVars()){
            this.props.get_Spotify_API()
        }
     
    }
    handle_play_button(data) {
        console.log(data);
        
    
        this.setState({ name: data.name })

        // //prevent repeatly requrest
        if (this.state.name != data.name) {
            this.props.searchYoutubeByUrl({ name: data.artists[0].name + '  ' + data.name })
        }

    }


    render() {
        let data= this.props.data.data? this.props.data.data.items :null
        console.log(data);
        
        return (
            <div>
                <div id='spotify'></div>
            
                <Grid style={{zIndex:'99'}}>
                
                    <Grid.Column widescreen={16}>
                        {data ? data.map(data => {
                            return <div key={data.track.id} className="track">
                                <Grid.Row>
                                    <Button className='play_button' fluid onClick={() => this.handle_play_button(data.track)}>
                                        <Grid.Column width={3}>
                                            <Image className='play_Icon' src={play_Icon}></Image> 
                                            <Image className='playlist_img' src={data.track.album.images[2].url}></Image>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <div className='playlist_info'>
                                                <h3>{data.track.name}</h3>
                                                <p>{data.track.album.artists[0].name}</p>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {/* <Sidebar id={data.track.id} tracks_url={data.url} handle_mylist_button={this.handle_mylist_button}></Sidebar> */}
                                        </Grid.Column>
                                    </Button>
                                </Grid.Row>
                            </div>
                        }) : null}
                        <div style={{ paddingTop: '300px' }}></div>
                    </Grid.Column>
                </Grid>
</div>
        )
    }
}

const mapStatetoProps = state => { return { data: state.spotify } }
const actionCreate = { get_Spotify_API,searchYoutubeByUrl}
spotify_list = connect(mapStatetoProps, actionCreate)(spotify_list)


export default spotify_list