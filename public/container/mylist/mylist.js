import React, { Component } from 'react'
import { Button ,Loader} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getUrlVars } from '../../component/getKKboxAPI'

import './mylist.css'
import Kkboxlist from './kkbox_list'
import Spotify_list from './spotify_list'
let sp_my_client_id = '3d6feac295e24ced8496590335a261ef'
let scopes = 'user-read-private user-read-email user-library-read';
let sp_url = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + sp_my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('https://kkboxoauth2.herokuapp.com/mylist')
const url = 'https://account.kkbox.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fmylist&client_id=b89dc89b34b7f4d2759580c9b53141ae&response_type=code&state=123'
class Mylist extends Component {




    render() {
        console.log(this.props);
        let kk_bool = this.props.mylist.bool
        let sp_bool = this.props.spotify.bool
        let sp_data = this.props.spotify.data ? this.props.spotify.data : null
        let kk_data = this.props.mylist.mylist ? this.props.mylist.mylist : null
        return (
            <div className="header">
                <h1>我的歌單</h1>
                <div className='login_button'>
                 
                    {sp_bool == true && kk_bool === true ?
                        <Button style={kk_data.data != undefined ? { display: 'none' } : {}} primary disabled={!!this.props.mylist.my_info} >
                            <a href={url}>登入 ＫＫＢＯＸ</a>
                        </Button> : null}
                    {sp_bool == true && kk_bool === true ? <Button disabled={!!this.props.mylist.my_info} secondary>
                        <a href={sp_url}>登入ＳＰＯＴＩＦＹ</a>
                    </Button> : null}
                </div>
                <Kkboxlist></Kkboxlist>
                <Spotify_list></Spotify_list> 
                
               
            </div>
        )
    }
}

const mapStatetoProps = state => { return { mylist: state.mylist, spotify: state.spotify } }

const actionCreate = {}
Mylist = connect(mapStatetoProps, actionCreate)(Mylist)

export default Mylist