import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Grid, Loader } from 'semantic-ui-react'
import './box.css'
import { icon } from './box.img'
import { modify_updated_at } from '../getKKboxAPI'
import { connect } from 'react-redux'
import { get_Featured_Playlists_Api, handle_Init_State } from '../../redux/box.redux'
import { withRouter } from 'react-router-dom'

class Box extends Component {
    componentDidMount() {
        let url = this.props.location.url ? this.props.location.url : 'https://api.kkbox.com/v1.1/featured-playlists?territory='+this.props.data.setting.language
        this.props.get_Featured_Playlists_Api(url)
    }

    componentWillUnmount() {
        this.props.handle_Init_State()
    }
    render() {
        
        let data = 'playlists' in this.props.data.box.box_data ? this.props.data.box.box_data.playlists.data : this.props.data.box.box_data.data
        let title = 'playlists' in this.props.data.box.box_data ? this.props.data.box.box_data.title : this.props.data.box.title
        let bool = this.props.data.box.bool
        return (

            <div className="header">
                <h1>{title}</h1>
                <Loader active={bool} inline='centered' size='huge' disabled />
                <Grid>
                    <Grid.Row>
                        {data ? data.map(data => {
                            return <div key={data.id} className='playlist'>
                                <Grid.Column>
                                    <Link to={'/playlist/' + data.id} id={data.id}>
                                        <Image style={{ width: ' 100%' }} centered={true} className='img' src={data.images[0].url}>
                                        </Image>
                                    </Link>
                                    <Link to={'/playlist/' + data.id} id={data.id}>
                                        <Image className="play_icon" src={icon} bordered={true}></Image>
                                    </Link>
                                    <div className='title'>
                                        <a href={data.url}><h2>{data.title}</h2></a>
                                    </div>
                                    <div className='description'>
                                        <p >{data.description}</p>
                                    </div>
                                    <div className='text'>
                                        <a href={data.owner.url}><p>作者：{data.owner.name}</p></a>
                                        <p>更新：{modify_updated_at(data.updated_at)}</p>
                                    </div>
                                </Grid.Column>
                            </div>
                        }) : null}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return { data: state }
}
const actionCreate = { get_Featured_Playlists_Api, handle_Init_State }
Box = connect(mapStatetoProps, actionCreate)(Box)
export default withRouter(Box)