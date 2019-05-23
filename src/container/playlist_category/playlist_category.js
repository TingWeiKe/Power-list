import React, { Component } from 'react'
import { Loader, Button } from 'semantic-ui-react'
import { get_Playlist_category_Api, handleInitState } from '../../redux/playlist_category.redux'
import { get_Hotboard_Api } from '../../redux/hotBoard.redux'
import { get_Category_Api } from '../../redux/category.redux'
import { connect } from 'react-redux'
import './playlist_category.css'
import Feature from '../../component/feature/feature'
import HotBoard from '../../component/hotBoard/hotBoard'
import Category from '../../component/category/category'
import { getKKoxAccessToken, doCookieSetup } from '../../utils/getKKBoxAPI'


class Playlist_category extends Component {
    get_Data() {
        let language = this.props.data.setting.language
        const featureUrl = 'https://api.kkbox.com/v1.1/new-hits-playlists?territory=' + language
        const hotBoardUrl = 'https://api.kkbox.com/v1.1/charts?territory=' + language
        const categoryUrl = 'https://api.kkbox.com//v1.1/featured-playlist-categories?territory=' + language
        this.props.get_Playlist_category_Api(featureUrl)
        this.props.get_Hotboard_Api(hotBoardUrl)
        this.props.get_Category_Api(categoryUrl)
    }
    componentDidMount() {
        this.props.data.playlist_category.playlist_category_data.hasOwnProperty('data') &&
            this.props.data.hot_board.hot_board_data.hasOwnProperty('data') ? null : this.get_Data()
    }

    handle_Refresh() {
        this.props.handleInitState()
        getKKoxAccessToken()
            .then(res => {
                if (res.access_token !== undefined) {
                    doCookieSetup('token', res.access_token, res.expires_in)
                }
                this.get_Data()
            })

    }
    render() {
        let bool1 = this.props.data.playlist_category.bool
        let bool2 = this.props.data.category.bool
        let hb_msg = this.props.data.hot_board.msg
        let pc_msg = this.props.data.playlist_category.msg
        return (
            <div className="container_header">
                <h1>歌單</h1>
                <div className='refresh_button' style={hb_msg && pc_msg == '伺服器錯誤' ? { display: 'block' } : null}>
                    <Button onClick={() => this.handle_Refresh()} primary size='big' >重新整理</Button>
                </div>
                <Loader content='載入中...' className='loader' active={bool1 == true && pc_msg !== '伺服器錯誤'} inline='centered' size='huge' />
                {bool1 && bool2 && this.props.data.playlist_category.hot_board == true ? null :
                    <div style={bool1 && bool2 && this.props.data.playlist_category.hot_board == true ? { display: 'none' } : { display: 'block' }}>
                        {hb_msg && pc_msg !== '伺服器錯誤' ? <h2 className='subheader'>最新主打</h2> : null}
                        <Feature data={this.props.data.playlist_category.playlist_category_data.data} />
                        {hb_msg && pc_msg !== '伺服器錯誤'? <h2 className='subheader'>排行榜</h2> : null}
                        <HotBoard data={this.props.data.hot_board.hot_board_data.data} />
                        {hb_msg && pc_msg !== '伺服器錯誤' ? <h2 className='subheader'>歌單分類</h2> : null}
                        <Category data={this.props.data.category.category_data.data} language={this.props.data.setting.language} />
                    </div>}
                    <div style={{ marginTop: '100px' }}></div>
            </div>
        )
    }
}

const mapStateToProps = state => { return { data: state } }
const actionCreate = { get_Playlist_category_Api, get_Hotboard_Api, get_Category_Api, handleInitState }
Playlist_category = connect(mapStateToProps, actionCreate)(Playlist_category)

export default Playlist_category