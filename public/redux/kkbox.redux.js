
import axios from 'axios'
import { getUrlVars, doCookieSetup, getCookie } from '../component/getKKboxAPI'
const PUT_KKBOX_TRACK_SUCCESS = 'PUT_TRACK_SUCCESS'

const init = {
    put_kkbox_success: false,
    put_kkbox_msg: '歌曲搜尋中．．．',
    msg: '',
    bool: true
}


export function put_kkbox(state = init, action) {
    switch (action.type) {
        case PUT_KKBOX_TRACK_SUCCESS:
            console.log(res);
            return state = { ...state, put_kkbox_msg: '匯入歌曲成功', put_kkbox_success: true }
        default:
            return state
    }
}


export function put_Kkbox_Track(id) {
    return dispatch => {
        axios.post('/post/push_tracks', { id: id,access_token:getCookie('token')})
            .then(res => {

                dispatch({ type: PUT_KKBOX_TRACK_SUCCESS })
            })


    }

}