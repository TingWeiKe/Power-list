import React, { Component } from 'react'
import { Button, Grid, Image, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUrlVars } from '../../component/getKKboxAPI'
import './mylist.css'
import Kkboxlist from './kkbox_list'
import Spotify_list from './spotify_list'
const url = 'https://account.kkbox.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fmylist&client_id=b89dc89b34b7f4d2759580c9b53141ae&response_type=code&state=123'
class Mylist extends Component {




    render() {
        let data = this.props.data.my_info ? this.props.data.my_info : null
        return (
            <div className="header">
                <h1>我的歌單</h1>
                <div className='login_button'>
                    {this.props.data.mylist.data == undefined ?
                        <Button style={this.props.data.mylist.data != undefined ? { display: 'none' } : {}} primary disabled={!!this.props.data.my_info} >
                            <a href={url}>登入 ＫＫＢＯＸ</a>
                        </Button> : null}
                    <Button secondary>
                        <a href="/post/loggin_spotify">登入ＳＰＯＴＩＦＹ</a>
                    </Button>
                    {/* <Loader content='載入中...' active={this.props.data.mylist.data == undefined && getUrlVars() != null} inline={'centered'} size='massive' /> */}
                </div>
                <Kkboxlist></Kkboxlist>
                <Spotify_list></Spotify_list>
            </div>
        )
    }
}

const mapStatetoProps = state => { return { data: state.mylist } }

const actionCreate = {}
Mylist = connect(mapStatetoProps, actionCreate)(Mylist)

export default Mylist