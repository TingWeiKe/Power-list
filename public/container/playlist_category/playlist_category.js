import React, { Component } from 'react'
import { Search} from 'semantic-ui-react'
import { get_Playlist_category_Api } from '../../redux/playlist_category.redux'
import { connect } from 'react-redux'
import './playlist_category.css'
import Feature from './feature/feature'
import HotBoard from './hotBoard/hotboard'
import Category from './category/category'

class Playlist_category extends Component {


    componentDidMount(){
        const featureUrl = 'https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW'
        const hotBoardUrl = ''
        const categoryData=''
        this.props.get_Playlist_category_Api(featureUrl)
    }


    render() {
        console.log(this.props)
       
        return (
            
            <div className="header">
                <h1>歌單</h1>
                <Search open={false} style={{display:'block'}}></Search>
                <h2 className='subheader'>最新主打</h2>
                <Feature data={this.props.data.playlist_category.playlist_category_data.data}/>
                <h2 className='subheader'>排行榜</h2>
                {/* <HotBoard/> */}
                <h2 className='subheader'>歌單分類</h2>
                {/* <Category/> */}
            </div>
        )
    }
}
const mapStatetoProps = state => {return { data: state }}
const actionCreate = { get_Playlist_category_Api }
Playlist_category = connect(mapStatetoProps, actionCreate)(Playlist_category)

export default Playlist_category