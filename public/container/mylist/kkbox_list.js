import React, { Component } from 'react'
import { play_Icon } from '../../component/playlist/playlist.img'
import { Button, Grid, Image, Loader } from 'semantic-ui-react'
import { getMylist } from '../../redux/mylist_redux'
import { searchYoutubeByUrl } from '../../redux/youtube.redux'
import { connect } from 'react-redux'
import { getUrlVars } from '../../component/getKKboxAPI'
import InfiniteScroll from 'react-infinite-scroller';
import './mylist.css'



class kkboxlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: true,

        }
    }
    componentDidMount() {
        const url = 'https://api.kkbox.com/v1.1/me'
        console.log(getUrlVars());

        if (getUrlVars() && getUrlVars().length > 20 && getUrlVars().length < 50) {
            this.props.getMylist(url)
        }
    }
    handle_play_button(name, artist) {
        this.setState({ name: name })
        this.props.searchYoutubeByUrl({ name: name + '  ' + artist })
    }

    handle_Sort() {
        this.setState({ toggle: !this.state.toggle })
        this.props.data.mylist.data.reverse()
    }
    render() {
        let data = this.props.data.my_info ? this.props.data.my_info : null
        return (
            <div>
                <Loader content='載入中...' active={getUrlVars() && getUrlVars().length > 20 && getUrlVars().length < 50 &&this.props.data.mylist.data == undefined} inline={'centered'} size='massive' />
                {this.props.data.mylist.data != undefined ? <Grid stackable={true} textAlign={"left"}>
                    <Grid.Column widescreen={6}>
                        <Grid.Row>
                            <Image rounded centered circular src={data ? this.props.data.my_info.images[2].url : null} />

                            <div style={{ textAlign: 'center' }} className="list_text">
                                <a className="list_owner" href={data ? this.props.data.my_info.url : null}><h2>{data ? this.props.data.my_info.name : null}</h2></a>
                            </div>
                        </Grid.Row>
                    </Grid.Column>


                    <Grid.Column style={{ position: 'relative', bottom: '52px' }} widescreen={10}>
                        <div className='list_box'>
                            {this.props.data.mylist.data != undefined ? <Button onClick={() => this.handle_Sort()}>排序</Button> : null}
                            {this.props.data.mylist.data != undefined ? <h3>{this.state.toggle ? '最舊 ======> 最新' : '最新 ======> 最舊'}</h3> : null}
                            {this.props.data.mylist.data != undefined ? this.props.data.mylist.data.map(data => {
                                return <div key={data.id} className="track">
                                    <Grid.Row>
                                        <Button className='play_button' fluid onClick={() => this.handle_play_button(data.name, data.album.artist.name)}>
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
                                            </Grid.Column>
                                        </Button>
                                    </Grid.Row>
                                </div>
                            }) : null}

                        <InfiniteScroll
                                pageStart={0}
                                loadMore={()=>{console.log('QQ')}}
                                hasMore={true}
                                useWindow={false}
                                >
                                <h1>QQ</h1>
                            </InfiniteScroll>

                           <div style={{ paddingTop: '200px' }}></div>
                        </div>
                        
                    </Grid.Column>

                </Grid> : null}

            </div>
        )
    }
}


const mapStatetoProps = state => { return { data: state.mylist } }

const actionCreate = { getMylist, searchYoutubeByUrl }
kkboxlist = connect(mapStatetoProps, actionCreate)(kkboxlist)

export default kkboxlist