import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './mylist.css'
import Kkboxlist from './kkbox_list'
import Spotify_list from './spotify_list'
import Axios from 'axios';

class Mylist extends Component {
    loggin_Kkbox(){
        Axios.post('/post/loggin_kkbox')
        .then(res=>{
            console.log(res);
            window.location.href = res.data
        })
    }

    loggin_Spotify(){
        Axios.post('/post/loggin_spotify')
        .then(res=>{
           window.location.href = res.data
            
        })
    }

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
                        <Button onClick={()=>this.loggin_Kkbox()} style={kk_data.data != undefined ? { display: 'none' } : {}} primary disabled={!!this.props.mylist.my_info} >
                            <a>登入 ＫＫＢＯＸ</a>
                        </Button> : null}
                    {sp_bool == true && kk_bool === true ? <Button onClick={()=>this.loggin_Spotify()} disabled={!!this.props.mylist.my_info} secondary>
                        <a>登入ＳＰＯＴＩＦＹ</a>
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