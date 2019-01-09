import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_Playlists_Id_Api, hadndle_Init_State } from '../../redux/playlist.redux'
import { Button, Grid, Image, Loader, Item, Icon } from 'semantic-ui-react'
import { modify_updated_at } from '../../component/getKKboxAPI'
import { play_Icon } from './playlist.img'
export default class Content extends Component {

    handle_play_button(id){
        console.log(id)
        this.setState({key:id})
    }
    handle_option_button(e){
        console.log('option')
        e.stopPropagation();
    }
    constructor(props) {
        super(props)
        this.state = {
          key: ''
        }
      }
    render() {
        let data = this.props.data
        return (
            <div>
                {console.log()}
                <Grid stackable={true} textAlign={"left"}>
                    <Grid.Column widescreen={8}>
                        <h1>{data.title}</h1>
                        <Button className='play' fluid>Fits to Container</Button>
                        <Grid>

                            <Grid.Column width={16}>
                                <Image src={data.images[2].url} />
                                <div className='playlist_text_box'>

                                    <div className='list_description'>
                                        <pre>{data.description}</pre>
                                    </div>
                                    <div className='play_text'>
                                        <a href={data.owner.url}><p>作者；{data.owner.name}</p></a>
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
                                        
                                        <Button style={{zIndex:'2'}}className='play_button' fluid onClick={() => this.handle_play_button(data.id)}>
                                        <Grid.Column width={3}>
                                        
                                        {this.state.key==data.id?<Image disabled={true} className='play_Icon' src={play_Icon}></Image>:null}
                                            <Image className='playlist_img' src={data.album.images[0].url}></Image>
                                           
                                        </Grid.Column>
                                        <Grid.Column width={6}>

                                            <div className='playlist_info'>

                                                <h4>{data.name}</h4>
                                                <p>{data.album.artist.name}</p>

                                            </div>
                                            
                                        </Grid.Column>
                                        
                                        <Grid.Column width={4}>
                                    
                                                <Icon style={{zIndex:'10'}} name='sidebar' size='large' className='siderbar' onClick={(e)=>this.handle_option_button(e)}></Icon>
                                           

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
