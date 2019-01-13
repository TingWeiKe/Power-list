import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image, Grid, Loader } from 'semantic-ui-react'

import { icon } from './category.img'
import { modify_updated_at } from '../getKKboxAPI'
import { connect } from 'react-redux'
import { get_Category_Box_api, handle_Init_State } from '../../redux/category_box.redux'
import { withRouter,} from 'react-router-dom'

class Category_box extends Component {
    componentWillMount() {
        let url = this.props.location.url?  this.props.location.url:'https://api.kkbox.com/v1.1/featured-playlist-categories/' + this.props.location.pathname.split('/')[2] + '?territory='+localStorage.getItem('language')
        this.props.get_Category_Box_api(url)
        
    }
    render() {
         console.log(this.props)
         //rediret to playlist_category if category_box doesn't exist when chanage language
        //  {this.props.data.category_box.msg =="伺服器錯誤"?  this.props.history.push('/playlist_category'):null}

        let data = this.props.data.category_box.category_box_data.hasOwnProperty('playlists')?  this.props.data.category_box.category_box_data.playlists.data :null
        let title = this.props.data.category_box.category_box_data.hasOwnProperty('title')?this.props.data.category_box.category_box_data.title :null
        let bool = this.props.data.category_box.bool
        console.log(data)
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
const actionCreate = { get_Category_Box_api, handle_Init_State }
Category_box = connect(mapStatetoProps, actionCreate)(Category_box)
export default withRouter(Category_box)